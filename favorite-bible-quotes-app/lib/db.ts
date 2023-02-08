import dotenv from 'dotenv'
import pg from 'pg'; const {Client} = pg;
dotenv.config();

export interface Celebrities {
    id: number,
    full_name: string,
    image_url: string

}

export function getPgSQLClient() { 
    return process.env.DATABASE_URL ? new Client(process.env.DATABASE_URL) : undefined 
}



 
