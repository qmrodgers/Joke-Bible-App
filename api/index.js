"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
//const cors = require('cors'); enable here and in app.use(cors()) if you need to enable cors policy
const express_1 = __importDefault(require("express"));
const db_execute_1 = require("./db/db-execute");
const app = (0, express_1.default)(), port = 3000;
//app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World');
});
//type guard definition
function isRowDataPacket(result) {
    return result !== undefined;
}
app.get('/message', (req, res) => {
    res.send('Getting brave now, eh?');
});
//get all celebrities
app.get('/api/get/celebrities', (req, res) => {
    (0, db_execute_1.getCelebrities)().then((result) => {
        res.send(result);
    });
});
//get random celebrities
app.get('/api/get/celebrity/random', (req, res) => {
    (0, db_execute_1.getCelebrities)().then((result) => {
        //type guard
        if (isRowDataPacket(result)) {
            let random = Math.random();
            console.log(random);
            let randomIndex = Math.floor((random * (result.length)));
            res.send(result[randomIndex]);
        }
    });
});
app.get('/api/get/celebrity/id-:celebrityID', (req, res) => {
    console.log(Number.isInteger(req.params.celebrityID));
    if (!Number.isNaN(req.params.celebrityID)) {
        (0, db_execute_1.getCelebrityById)(Number.parseInt(req.params.celebrityID)).then((result) => {
            res.send(result);
        });
    }
    else {
        res.status(400).send({ message: 'Invalid parameter. Id number (integer) required' });
    }
});
app.get('/api/get/celebrity/name-:celebrityName', (req, res) => {
    (0, db_execute_1.getCelebrityByName)(req.params.celebrityName).then((result) => {
        res.send(result);
    });
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
