const express = require('express');
const router = express.Router({ mergeParams :true});
const pool = require('../config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();


router.post('/login', (req, res) => {
    const user = req.body;
    const sql = 'SELECT * FROM user WHERE email=?';
    pool.getConnection(function (err, connection){
        connection.query(sql, [user.email], (error, results, fields) => {
            connection.release();
            if(results.length !== 0){
                if(error || !bcrypt.compareSync(`${user.password}`, results[0].password)){
                    res.status(501).send("Mot de passe ou email invalide");
                }else{
                
                    jwt.sign( user, dotenv.parsed.JWT_SECRET, (err, token) => {
                        
                        if(err){
                            res.status(501).send('JWT error : ');
                        }else{
                            res.json({ token })
                        }
                    });
                }
            }else{
                res.status(501).send("email ou mot de passe inexistant");  
            }

        })
    });
});

module.exports = router;
