const express = require('express');
const router = express.Router();
const pool = require('../config.js');
const url = "/user";
const bcrypt = require('bcryptjs');
const salt = process.env.SALT;


 

router.get(url, (req, res) => {
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM user`, (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                res.status(200).send(results);
            }
            
        });
    });

});


router.get(url + "/:id", (req, res) => {
    const id = req.params.id;
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM user WHERE id=?`,[id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                res.status(200).send(results);
            }
            
        });
    });

});

router.post(url, (req, res) => {
    pool.getConnection(function (err, connection){

        const formData = req.body;
        let hash = bcrypt.hashSync(`${formData.password}`, salt);
        isEmail = req.body.email != "" ? true:false;
        isPassword = req.body.password != "" ? true:false;
        isPays = req.body.pays != "" ? true:false;

    if(isEmail && isPassword && isPays){
        connection.query(`INSERT INTO user (email,password,pays) VALUES (?,?,?)`,
        [formData.email, hash, formData.pays], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                const id = results.insertId;
                connection.query(`SELECT * FROM user WHERE id=?`,[id], (err, results, fields) => {
                    if(err){
                        res.status(200).send(err.message);
                    }else{
                        res.json(results)
                    }
                });
            }
        });
    }else{
        return res.status(400).json({"error": "required field(s) missing"});
    }

    });

});

router.put(url +'/:id', (req, res) => {
    const id = req.params.id;

    pool.getConnection(function (err, connection){
        const formData = req.body;
        let hash = bcrypt.hashSync(`${formData.password}`, salt);
        connection.query(`UPDATE user SET email=?,password=?,pays=? WHERE id=?`,[formData.email, hash, formData.pays, id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                connection.query(`SELECT * FROM user WHERE id=?`,[id], (err, results, fields) => {
                    if(err){
                        res.status(200).send(err.message);
                    }else{
                        res.json(results)
                    }
                });
            }
        });
    });
});

router.delete(url + '/:id', (req, res) => {
    const id = req.params.id;
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM user WHERE id=?`,[id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                let output = results;
                pool.getConnection(function (err, connection){
                    connection.query(`DELETE FROM user WHERE id=?`,[id], (err, results, fields) => {
                        if(err){
                            res.status(200).send(err.message);
                        }else{
                            res.send(output);
                        }
                    });
                });
            }
        });
    });
});

//BBOOOOMMMM
router.delete(url, (req, res) => {
    pool.getConnection(function (err, connection){
        connection.query('TRUNCATE TABLE user',(err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                res.send("BOOOMMMMM");
            }
    });
});
});




module.exports = router;