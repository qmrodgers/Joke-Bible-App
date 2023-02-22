import * as React from 'react';
import { useState, useEffect, useRef} from 'react';
import type { JWTVerifyResult } from 'jose';
import { verifyAuth0JWT } from '../lib/auth'
import axios from 'axios';

function UserBar() {

const toggleVisibility = () => {
const el = document.querySelector('.loginbox')
if (el) {
el.classList.toggle('expand')
}
}

const [user, setUser] = useState<JWTVerifyResult | undefined>(undefined);

    useEffect(() => {
        
        // set user
        ( async () => {

            const verified_token = await axios.request({
                method: 'GET',
                url: `/.netlify/functions/verifyToken`
                }).then(response => {
                    return response.data;
                }).catch(err => {
                    console.log(err);
                    return undefined;
                });


            if (verified_token) setUser(verified_token);

        })();


        }, [])




    if (!user) {
        return (
        <div className='loginbox'>
            <a href='/.netlify/functions/login'>Log in</a>
        </div>
        )
    }

    return ( 
        <div className='loginbox' onClick={toggleVisibility}>
        <p className='picturebox'><img src={user.payload['picture'] as string} alt='User PFP'/><span>&#8964;</span></p>
        <div className='detailsbox'>
        <p className='username'>{user.payload['given_name'] as string}</p>


        </div>
        </div>
    );

}

export default UserBar;
