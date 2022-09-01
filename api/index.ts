require('dotenv').config();
const cors = require('cors');
import express from "express";
import { RowDataPacket } from "mysql2";
import { getCelebrities, getCelebrityById, getCelebrityByName } from "./db/db-execute";

const app = express(),
      port = process.env.PORT || 80;

app.use(cors());

app.get('/', (req: any, res: any) => {
    res.send('Hello World');
})

//type guard definition
function isRowDataPacket(result: RowDataPacket[] | unknown): result is RowDataPacket[] {
    return (result as RowDataPacket[]) !== undefined;
  }

app.get('/message', (req, res) => {
    res.send('Getting brave now, eh?');
})

//get all celebrities
app.get('/api/get/celebrities', (req, res) => {
    getCelebrities().then((result) => {
        res.send(result);
    });
})

//get random celebrities
app.get('/api/get/celebrity/random', (req, res) => {
    getCelebrities().then((result) => {
        //type guard
        if (isRowDataPacket(result)) {
            let random = Math.random();
            console.log(random);
            let randomIndex = Math.floor((random * (result.length)));
            res.send(result[randomIndex]);
        }
        
    })
})

app.get('/api/get/celebrity/id-:celebrityID', (req, res) => {
    console.log(Number.isInteger(req.params.celebrityID));
    if (!Number.isNaN(req.params.celebrityID)) {
        getCelebrityById(Number.parseInt(req.params.celebrityID)).then((result) => {
            res.send(result);
        }); 
    }
    else {
        res.status(400).send({message: 'Invalid parameter. Id number (integer) required'});
    }
    
})

app.get('/api/get/celebrity/name-:celebrityName', (req, res) => {
    getCelebrityByName(req.params.celebrityName).then((result) => {
        res.send(result);
    });
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})