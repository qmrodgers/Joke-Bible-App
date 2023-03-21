
import { } from '@netlify/functions'
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { verifyAuth0JWT } from '../../src/lib/auth';
import * as cookie from 'cookie';




const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
console.log('received token verification request');

const cookies = event['headers']['cookie'] ?? undefined;
if (!cookies) {
console.error('No cookies');
return {
statusCode: 200,
body: JSON.stringify(undefined)
}}


const id_token = cookie.parse(cookies)['id_token'] ?? undefined;
if (!id_token) {
console.error('No id_token');
return {
statusCode: 200,
body: JSON.stringify(undefined)
}}



const jwt_content = await verifyAuth0JWT(id_token); 
if (!jwt_content) {
console.error('unable to verify token');
return {
    statusCode: 200,
    body: JSON.stringify(undefined)
}
}

return {
statusCode: 200,
body: JSON.stringify(jwt_content)
}

}

export { handler };
