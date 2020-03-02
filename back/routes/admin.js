const express = require('express');
const router = express.Router();
const pool = require('../config.js');
const url = "/admin";
const bcrypt = require('bcryptjs');
const salt = process.env.SALT;



 

router.get(url, (req, res) => {
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM admin`, (err, results, fields) => {
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
        connection.query(`SELECT * FROM admin WHERE id=?`,[id], (err, results, fields) => {
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
        connection.query(`INSERT INTO admin (email,password) VALUES (?,?)`,
        [formData.email, hash], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                const id = results.insertId;
                connection.query(`SELECT * FROM admin WHERE id=?`,[id], (err, results, fields) => {
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

router.put(url +'/:id', (req, res) => {
    const id = req.params.id;

    pool.getConnection(function (err, connection){
        const formData = req.body;
        let hash = bcrypt.hashSync(`${formData.password}`, salt);
        connection.query(`UPDATE admin SET email=?,password=? WHERE id=?`,[formData.email, hash, id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                connection.query(`SELECT * FROM admin WHERE id=?`,[id], (err, results, fields) => {
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
        connection.query(`SELECT * FROM admin WHERE id=?`,[id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                let output = results;
                pool.getConnection(function (err, connection){
                    connection.query(`DELETE FROM admin WHERE id=?`,[id], (err, results, fields) => {
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
        connection.query('TRUNCATE TABLE admin',(err, results, fields) => {
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