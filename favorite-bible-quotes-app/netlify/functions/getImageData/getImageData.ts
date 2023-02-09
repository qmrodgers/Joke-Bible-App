import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getPgSQLClient} from "../../../src/lib/db";
import { type CelebrityData } from "../../../src/lib//types";
import { KnuthShuffleArray } from "../../../src/lib/shuffle"
import pg from 'pg'; 


const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // your server-side functionality
    //
    const  sql: pg.Client | undefined = getPgSQLClient();
    //console.log(sql);
    console.log("hi there")
    if (!sql) {
        console.log("exiting");
    return {
        statusCode: 500,
        body: "There was an error communicating with the data server"
    };    
    }

    try {
        await sql.connect();
        let data: CelebrityData = await sql.query('SELECT full_name, image_url FROM celebrities');
        sql.end();
        
        data = KnuthShuffleArray(data);

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        }
    } catch(err) {
    
        return {
            statusCode: 500,
            body: "Unspecified error querying celebrities"
        }
    }



   // console.log(data);


};

export { handler };
