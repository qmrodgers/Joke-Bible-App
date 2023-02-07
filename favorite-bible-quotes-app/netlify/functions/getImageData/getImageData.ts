import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getPgSQLClient, Celebrities } from "../../../lib/db.ts";
import postgres from 'postgres'

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // your server-side functionality
    //
    let data: Celebrities[]; 
    const sql: postgres.Sql<{}> | undefined = getPgSQLClient();
    
    console.log("hi there")
    if (!sql) {
    return {
        statusCode: 500,
        body: "There was an error communicating with the data server"
    };    
    }
    
    data = await sql<Celebrities[]>`
    SELECT * FROM CELEBRITIES
    `


    console.log(data);
    console.log("hello");

    return {
    statusCode: 200,
    body: JSON.stringify({ message: "hello" })
    }


};

export { handler };
