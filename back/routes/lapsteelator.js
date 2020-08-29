const express = require('express');
const router = express.Router();
const pool = require('../config.js');
const bodyParser = require('body-parser');
const url = "/lapsteelator"
const auth = require('./verifyTokenAdmin');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get(url, (req, res) => {
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM lapsteelator`, (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                res.status(200).send(results);
            }
            
        });
    });

});

router.get(url + '/:id', (req, res) => {
    const id = req.params.id;
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM lapsteelator WHERE id=?`,[id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                res.status(200).send(results);
            }
            
        });
    });

});

router.post(url, auth ,(req, res) => {
    pool.getConnection(function (err, connection){

        const formData = req.body;

        connection.query(`INSERT INTO lapsteelator (liste_mode) VALUES (?)`,
        [formData.liste_mode], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                const id = results.insertId;
              
                connection.query(`SELECT * FROM lapsteelator WHERE id=?`,[id], (err, results, fields) => {
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

router.put(url + '/:id',auth , (req, res) => {
    const id = req.params.id;

    pool.getConnection(function (err, connection){
        const formData = req.body;
        connection.query(`UPDATE lapsteelator SET liste_mode=? WHERE id=?`,[formData.liste_mode, id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                connection.query(`SELECT * FROM lapsteelator WHERE id=?`,[id], (err, results, fields) => {
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

router.delete(url + '/:id', auth ,(req, res) => {
    const id = req.params.id;
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM lapsteelator WHERE id=?`,[id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                let output = results;
                pool.getConnection(function (err, connection){
                    connection.query(`DELETE FROM lapsteelator WHERE id=?`,[id], (err, results, fields) => {
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
router.delete(url, auth ,(req, res) => {
        pool.getConnection(function (err, connection){
            connection.query('TRUNCATE TABLE lapsteelator',(err, results, fields) => {
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