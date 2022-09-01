
const dbConfig = {
host: process.env.SqlHost,
user: process.env.SqlUsername,
password: process.env.SqlPassword,
database: "celebrity_database",
multipleStatements: false
}

export {
    dbConfig
}


