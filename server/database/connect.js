require('dotenv').config();
const Pool = require('pg').Pool;

const USER = process.env.PG_USER;
const HOST = process.env.PG_HOST;
const DATABASE = process.env.PG_DATABASE;
const PASSWORD = process.env.PG_PASSWORD;
const PORT = process.env.PG_PORT;

const pool = new Pool({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT,
    ssl: {
        rejectUnauthorized: false
      }
});

module.exports = pool;