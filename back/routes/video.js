const express = require('express');
const router = express.Router();
const pool = require('../config.js');
const bodyParser = require('body-parser');
const url = "/videos"

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get(url, (req, res) => {
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM video`, (err, results, fields) => {
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
        connection.query(`SELECT * FROM video WHERE id=?`,[id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                if(results.length != 0){
                    res.status(200).send(results);
                }else{
                    res.status(400).json({"message":"Bad Request"});
                }

            }
            
        });
    });

});

router.post(url, (req, res) => {
    pool.getConnection(function (err, connection){

        const formData = req.body;
       if(!req.body.url){
           return res.status(422).json({"error": "required field(s) missing"});
       }else{
            connection.query(`INSERT INTO video (url) VALUES (?)`,
            [formData.url], (err, results, fields) => {
                connection.release();
                if(err){
                    res.status(200).send(err.message);
                }else{
                    const id = results.insertId;
                    connection.query(`SELECT url FROM video WHERE id=?`,[id], (err, results, fields) => {
                        if(err){
                            res.status(200).send(err.message);
                        }else{
                            res.json(results)
                        }
                    });
                }
            });
        }
    });

});

router.put(url + '/:id', (req, res) => {
    const id = req.params.id;

    pool.getConnection(function (err, connection){
        const formData = req.body;

        connection.query(`UPDATE video SET url=? WHERE id=?`,[formData.url, id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                connection.query(`SELECT * FROM video WHERE id=?`,[id], (err, results, fields) => {
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
        connection.query(`SELECT * FROM video WHERE id=?`,[id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                let output = results;
                if(output.length != 0){
                    pool.getConnection(function (err, connection){
                        connection.query(`DELETE FROM video WHERE id=?`,[id], (err, results, fields) => {
                            if(err){
                                res.status(200).send(err.message);
                            }else{
                                res.send(output);
                            }
                        });
                    });
                }else{
                    return res.status(400).json({"message":"Bad Request"});
                }
            }
        });
    });
});

//BBOOOOMMMM
router.delete(url, (req, res) => {
        pool.getConnection(function (err, connection){
            connection.query('TRUNCATE TABLE video',(err, results, fields) => {
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