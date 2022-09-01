
//const mysql2 = require('mysql2'),
import mysql2 from "mysql2";
import { RowDataPacket } from "mysql2";
import { query } from "express";


const connection = mysql2.createConnection(process.env.JAWSDB_URL as string);


connection.connect((err: any) => {
    if (err) throw err;
    console.log("test connection: connected");
        });


        
const getCelebrities = () => {
    connection.connect((err) => {
        if (err) throw err;
        console.log("connected successfully");
    });

    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM celebrities', (err, results, fields) => {

            if (err) console.log(err);
            console.log(results);
            resolve(results);
    
        });
    })

}

const getCelebrityById = (id: number) => {
    connection.connect((err) => {
        if (err) throw err;
        console.log("connected successfully")
    });

    return new Promise((resolve, reject) => {
        console.log(`SELECT * FROM celebrities WHERE id = ${id} LIMIT 1`);
        connection.query(`SELECT * FROM celebrities WHERE id = ${id} LIMIT 1`, (err, results, fields) => {
            if (err) console.log(err);
            console.log(results);
            resolve(results);
        })
    })
}


const getCelebrityByName = (name: string) => {
    connection.connect((err) => {
        if (err) throw err;
        console.log("connected successfully")
    });

    return new Promise((resolve, reject) => {
        console.log(`SELECT * FROM celebrities WHERE name = ${name} LIMIT 1`);
        connection.query(`SELECT * FROM celebrities WHERE name = '${name}'`, (err, results, fields) => {
            if (err) console.log(err);
            console.log(results);
            resolve(results);
        })
    })
}


export {
    getCelebrities, getCelebrityById, getCelebrityByName
}