const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "University_Site",
    password: "akmik",
    port: 5432,
});


// pool.on('error', (err) => {
//     console.error('Unexpected error on idle client', err);
//     process.exit(-1);
// });


// pool.connect((err, client, release) => {
//     if (err) {
//         return console.error('Error acquiring client', err.stack);
//     }
//     console.log('Connected to PostgreSQL University database');
//     release();
// });
module.exports = pool;