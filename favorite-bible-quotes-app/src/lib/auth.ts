import axios, { AxiosRequestConfig }  from 'axios';
import {Identity_Token_Response, Verified_JWT_Object} from './types';
import dotenv from 'dotenv'
import * as jose from 'jose';
import type {JWTVerifyResult} from 'jose'
dotenv.config();
export async function postForAuthCode(code: string, _redirect_uri: string): Promise<Identity_Token_Response | undefined> {
    
const requestOptions: AxiosRequestConfig<any> = {
method: 'POST',
url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
headers: {
   'content-type': 'application/x-www-form-urlencoded'
},
data: new URLSearchParams(
    {
        grant_type: 'authorization_code',
        client_id: `${process.env.AUTH0_CLIENT_ID}`,
        client_secret: `${process.env.AUTH0_CLIENT_SECRET}`,
        code: `${code}`,
        redirect_uri: _redirect_uri
    })
}

const authResponse = await axios.request(requestOptions)
.then(response => {
    return response.data
})
.catch(err => {
    console.log('Error in Retrieving Authentication: \n' + err)
    return undefined;
});

console.log('Auth Response \n' + JSON.stringify(authResponse))
console.log('ID Token \n' + authResponse.id_token)
return authResponse;
};



/* Verify JWT */
export async function verifyAuth0JWT(jwt: string): Promise<JWTVerifyResult | undefined> {

    const public_key_url = 'https://' + process.env.AUTH0_DOMAIN + `/pem`;


    const jwk = await axios.get(public_key_url)
    .then(response => {
        return jose.importX509(response.data ,'RS256')
    })
    .then(jose_jwk => {
    return jose_jwk
    })
    .catch(err => {
        console.error(err);
        return undefined
    });

    if (!jwk) {
    return undefined;
    }

    
    const result = await jose.jwtVerify(jwt, jwk);
    return result;

};
