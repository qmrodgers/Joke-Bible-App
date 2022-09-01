"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCelebrityByName = exports.getCelebrityById = exports.getCelebrities = void 0;
//const mysql2 = require('mysql2'),
//dotenv = require('dotenv').config({path: '../.env'});
const db_1 = require("./db");
const mysql2_1 = __importDefault(require("mysql2"));
const connection = mysql2_1.default.createConnection(db_1.dbConfig);
connection.connect((err) => {
    if (err)
        throw err;
    console.log("test connection: connected");
});
const getCelebrities = () => {
    connection.connect((err) => {
        if (err)
            throw err;
        console.log("connected successfully");
    });
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM celebrities', (err, results, fields) => {
            if (err)
                console.log(err);
            console.log(results);
            resolve(results);
        });
    });
};
exports.getCelebrities = getCelebrities;
const getCelebrityById = (id) => {
    connection.connect((err) => {
        if (err)
            throw err;
        console.log("connected successfully");
    });
    return new Promise((resolve, reject) => {
        console.log(`SELECT * FROM celebrities WHERE id = ${id} LIMIT 1`);
        connection.query(`SELECT * FROM celebrities WHERE id = ${id} LIMIT 1`, (err, results, fields) => {
            if (err)
                console.log(err);
            console.log(results);
            resolve(results);
        });
    });
};
exports.getCelebrityById = getCelebrityById;
const getCelebrityByName = (name) => {
    connection.connect((err) => {
        if (err)
            throw err;
        console.log("connected successfully");
    });
    return new Promise((resolve, reject) => {
        console.log(`SELECT * FROM celebrities WHERE name = ${name} LIMIT 1`);
        connection.query(`SELECT * FROM celebrities WHERE name = '${name}'`, (err, results, fields) => {
            if (err)
                console.log(err);
            console.log(results);
            resolve(results);
        });
    });
};
exports.getCelebrityByName = getCelebrityByName;
