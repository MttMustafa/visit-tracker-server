const mysql = require('mysql2/promise')

const configuration = {
    host: process.env.HOST,
    port: process.env.DBPORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

async function query(query, params) {
    const connection = await mysql.createConnection(configuration)
    const [rows, fields] = await connection.execute(query, params)

    return rows
}

module.exports = {
    query
}