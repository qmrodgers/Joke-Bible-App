import dotenv from 'dotenv'
import {CelebrityData, UserData} from './types'
import {KnuthShuffleArray, FisherYatesShuffleArray} from './shuffle'
import pg from 'pg'; const {Client} = pg;
dotenv.config();
export function getPgSQLClient() { 
    return process.env.DATABASE_URL ? new Client(process.env.DATABASE_URL) : undefined 
}

export async function addSession(client: pg.Client): Promise<boolean> {

    await client.connect();
    await client.query('INSERT INTO');

return true;
}

export async function getImageData(client: pg.Client): Promise<CelebrityData> {

        await client.connect();
        let data: CelebrityData = await client.query('SELECT full_name, image_url FROM celebrities');
        client.end();
        
        data = KnuthShuffleArray(data);

        return data;

}



export async function authenticateUser(token: any, client: pg.Client): Promise<void | Error> {

        await client.connect();
        
        let user: UserData = await client.query('SELECT * FROM users');


        
}

 
