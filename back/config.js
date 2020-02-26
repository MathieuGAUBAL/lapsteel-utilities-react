const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lapsteel_website'
});


/* pool.getConnection(function(err) {
    if (err){
        throw err;
    }else{
        console.log("connected to database : " + pool.config.connectionConfig.database);
    }
});  */

module.exports = pool;