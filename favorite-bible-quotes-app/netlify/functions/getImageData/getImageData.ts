import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getPgSQLClient, Celebrities } from "../../../lib/db";
import pg from 'pg'; const { Client } = pg;



const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // your server-side functionality
    //
    const  sql: pg.Client | undefined = getPgSQLClient();
    
    console.log("hi there")
    if (!sql) {
    return {
        statusCode: 500,
        body: "There was an error communicating with the data server"
    };    
    }
    
    let data: pg.QueryResult<Celebrities> = await sql.query(`
    SELECT * FROM CELEBRITIES
    `)


   // console.log(data);

    return {
    statusCode: 200,
    body: JSON.stringify(data)
    }


};

export { handler };
