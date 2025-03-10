require('dotenv').config();
const mariadb = require("mariadb")

const pool = mariadb.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,
    port: process.env.db_port
})

module.exports = Object.freeze({
    pool:pool
})