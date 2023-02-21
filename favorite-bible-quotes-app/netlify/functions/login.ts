import { } from '@netlify/functions'
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import dotenv from 'dotenv'

dotenv.config();

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    
//console.log(`${new URL(event.rawUrl).origin}/.netlify/functions/authorize`);
    const random_state = crypto.randomUUID();
    return {
        statusCode: 302,
        headers: {
            'Set-Cookie': `state=${random_state}; Max-Age=300; Path=/; Secure; HttpOnly`,
            'Location': `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&client_id=${process.env.AUTH0_CLIENT_ID}&scope=openid+email+profile&redirect_uri=${new URL(event.rawUrl).origin}/.netlify/functions/authorize&state=${random_state}`

        },
        body: JSON.stringify('')

    }



}

export {handler};
