import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getPgSQLClient } from "../../lib/db";
import postgres from 'postgres'

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // your server-side functionality
    //
    let data; 
    const sql: postgres.Sql<{}> | undefined = getPgSQLClient();


    if (!sql) {
    return {
        statusCode: 500,
        body: "There was an error communicating with the data server"
    }    
    }


    console.log(data);
    

    return {
    statusCode: 200,
    body: data
    }


};

export { handler };
