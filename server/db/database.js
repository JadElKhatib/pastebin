const mariadb = require("mariadb")

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "rootpassword",
    database: "pastebin_users_master",
    port: 3306
})

module.exports = Object.freeze({
    pool:pool
})