const mysql = require('mysql2/promise')

const configuration = {
    host: process.env.HOST,
    port: process.env.DBPORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: process.env.WAITFORCONN,
    connectionLimit: process.env.CONNLIM,
    idleTimeout: process.env.IDLETIMEOUT,
    queueLimit: process.env.QLIM
}

const connection = await mysql.createPool(configuration)

async function query(query, params) {
    const [rows, fields] = await connection.execute(query, params)
    return rows
}

module.exports = {
    query
}