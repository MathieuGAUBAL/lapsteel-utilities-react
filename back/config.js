const mysql = require('mysql');
const dotenv = require('dotenv').config();

const pool = mysql.createPool({
    host: dotenv.parsed.DB_HOST,
    user: dotenv.parsed.DB_USER,
    password: dotenv.parsed.DB_PASSWORD,
    database: dotenv.parsed.DB_DATABSE
});


/*  pool.getConnection(function(err) {
    if (err){
        throw err;
    }else{
        console.log("connected to database");
    }
});   */

module.exports = pool;