import {} from '@netlify/functions'

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

const id_token = 'id_token=; Max-Age=3600; Path=/; HttpOnly; Secure;'; 
const state = 'state=; Max-Age=3600; Path=/; HttpOnly; Secure;';

return {
statusCode: 301,
headers: {
'Location': '/',
'Set-Cookie': [id_token, state]
}}


}

export {handler}

