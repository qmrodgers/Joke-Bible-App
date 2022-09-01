"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const dbConfig = {
    host: process.env.SqlHost,
    user: process.env.SqlUsername,
    password: process.env.SqlPassword,
    database: "celebrity_database",
    multipleStatements: false
};
exports.dbConfig = dbConfig;
