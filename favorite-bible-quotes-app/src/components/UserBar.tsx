import * as React from 'react';
import { useState, useEffect, useRef} from 'react';
import type { JWTVerifyResult } from 'jose';
import { verifyAuth0JWT } from '../lib/auth'
import {Modal, ModalContent, ModalButton, ButtonProps} from '../components/Modal'
import axios from 'axios';

function UserBar() {

const toggleVisibility = () => {
const el = document.querySelector('.loginbox')
if (el) {
el.classList.toggle('expand')
}
}

const [user, setUser] = useState<JWTVerifyResult | undefined>(undefined);
const [valid, setValid] = useState<boolean>(true);

    useEffect(() => {
        
        // set user
        ( async () => {
            
            if (valid) {
            const verified_token = await axios.request({
                method: 'GET',
                url: `/.netlify/functions/verifyToken`
                }).then(response => {
                    return response.data ?? undefined;
                }).catch(err => {
                    console.log(err);
                    return undefined;
                });
            

                if (verified_token) {
                await axios.get(verified_token.payload['picture'])
                .then(response => {
                    verified_token.payload['picture'] = URL.createObjectURL(response.data)
                }).catch((err) => {
                console.error('Could not create object url')
                })
                }
            
                setUser(verified_token)
            

            if (user?.payload?.exp) {
            console.log('setting timeout')
            setTimeout(() => {console.log('invalid'); setValid(false)}, (user?.payload?.exp ? user.payload.exp - Date.now() : 0))
            }}

            // user?.payload?.exp ? user.payload.exp - Date.now()


            

            

        })();


        }, [valid])




    if (!user) {
        return (
        <div className='loginbox'>
            <a href='/.netlify/functions/login'>Log in</a>
        </div>
        )
    }

    return (
    <>
        {!valid ? <Modal enabled={true}
            heading='Invalid Token'
            subheading='The token is expired or invalid'
            paragraph='You will be logged out in 5 seconds'
            escape={false}
            onLoad={() => {setTimeout(() => {window.location.href = '/.netlify/functions/logout'}, 5000)}}
            button={() => <ModalButton buttonText="Log out" func={() => window.location.href = '/.netlify/functions/logout'}/>}
            /> : null}
        <div className='loginbox' onClick={toggleVisibility}>
        <p className='picturebox'><img src={user.payload['picture'] as string} alt='User PFP'/><span>&#8964;</span></p>
        <div className='detailsbox'>
        <p className='username'>{user.payload['given_name'] as string}</p>
        <a href='/.netlify/functions/logout'>Log out</a>
        <p>User-generated images are in development</p>

        </div>
        </div>
    </>
    );

}

export { UserBar };
