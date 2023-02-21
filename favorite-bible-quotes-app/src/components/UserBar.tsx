import * as React from 'react';
import { useState, useEffect, useRef} from 'react';
import type { JWTVerifyResult } from 'jose';
import { verifyAuth0JWT } from '../lib/auth'
import axios from 'axios';

// Empty Identity for use in case no id token is available
const emptyIdentity = {
protectedHeader: {'alg': 'RS256'}, 
payload: {
    'name': 'Log In',            
    'picture': '',
    'given_name': 'Log In'
         }
    }

function UserBar() {

const [user, setUser] = useState<JWTVerifyResult>(emptyIdentity);

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




    if (user.payload['given_name']

    return ( 


            <div className='loginbox'>
               {(() => {
                   if (user.payload['given_name'] === 'Log In') {
                       return (<a href='/.netlify/functions/login'>Log in</a>)
                       }
                       return (<span>{`Hello ${user.payload['given_name'] as string}!`} &nbsp; <img src={user.payload['picture'] as string} alt='User Profile Picture'/></span>)

                       }
                )()} 
            </div>
    

    );

}

export default UserBar;
