import dotenv from 'dotenv'
import pg from 'pg'
import * as cookie from 'cookie'
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { postForAuthCode, verifyAuth0JWT } from '../../src/lib/auth';
import { getPgSQLClient, addSession } from '../../src/lib/db'
import { Verified_JWT_Object } from '../../src/lib/types';



dotenv.config();


const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

/* Auth0 redirect will grant authorization code, and should feed back the state granted via cookie in the login redirect */
if (event.queryStringParameters?.error || !event.queryStringParameters?.code || !event.queryStringParameters?.state) {
    return {
        statusCode: 301,
        
        body: JSON.stringify('Error or Invalid Redirect'),
        headers: {
            'Location': `/`
        }}
    }


    
const code = event.queryStringParameters.code;
const state = event.queryStringParameters.state;



/* Check to see if state cookie exists, set in login endpoint to prevent Cross Site Request Forgery */
const cookies = event['headers']['cookie'] ? cookie.parse(event['headers']['cookie']) : undefined;
console.log(cookies);
if (!cookies || !cookies['state']) {
console.log('no cookies');
return {
    statusCode: 401,
    body: JSON.stringify('Invalid redirect from authorization endpoint'),
    }
}


/* Must compare cookies  */
if (!cookie || cookies['state'] !== state) {
    return {
        statusCode: 401,
        body: JSON.stringify('Not Authorized'),
        headers: {
            'Set-Cookie': `state=; Max-Age=300; Path=/; Secure; HttpOnly`,
        }
}};



//console.log("extracted cookie for user auth state: " + cookie);

/* POST to Auth0 endpoint with authorization code to receive id JWT */
const auth_code_response = await postForAuthCode(code, (new URL(event.rawUrl).href));

if (!auth_code_response) {
    return {
        statusCode: 401,
        body: 'There was an issue acquiring user information from the Authorization Server',
    }
}


/* Gather decoded jwt */
const verifiedResult = await verifyAuth0JWT(auth_code_response.id_token); 

if (!verifiedResult?.payload){
return {
    statusCode: 401,
    body: 'Could not verify or retrieve payload from token'
}
}

console.log(JSON.stringify(verifiedResult.payload));


/* Login user / establish in database for the first time */
const client = getPgSQLClient();

console.log('Just id_token after parse \n' + auth_code_response.id_token)

return {
statusCode: 301,
headers: {
'Set-Cookie': `id_token=${auth_code_response.id_token}; Path=/; Max-Age=${auth_code_response.expires_in}; Secure; HttpOnly;`, 
'Location': '/'
},
}
}

export {handler};
