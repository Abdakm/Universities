const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Users",
    password: "akmik",
    port: 5432,
});

module.exports = pool