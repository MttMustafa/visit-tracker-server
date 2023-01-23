const mysql = require('mysql2/promise')


const configuration = {
    host: '127.0.0.1',
    user: 'root',
    password: '9v6RpLgd%D',
    database: 'test'
}


async function query(query, params) {
    const connection = await mysql.createConnection(configuration)

    const [rows, fields] = await connection.execute(query, params)

    return rows
}

module.exports = {
    query
}