import postgres from 'postgres'
import dotenv from 'dotenv'
dotenv.config()

export interface Celebrities {
    id: number,
    full_name: string,
    image_url: string

}

export function getPgSQLClient() { 
    return process.env.COCKROACH_DB_CONNECTION_STRING ? postgres(process.env.COCKROACH_DB_CONNECTION_STRING) : undefined 
}



 
