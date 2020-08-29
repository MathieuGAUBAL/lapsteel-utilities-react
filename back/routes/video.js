const express = require('express');
const router = express.Router();
const pool = require('../config.js');
const bodyParser = require('body-parser');
const url = "/videos"
const auth = require('./verifyTokenAdmin');

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

router.get(url+'/:selected', (req, res) => {
    const selected = req.params.selected;
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM video WHERE rubrique=?`,[selected], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                res.status(200).send(results);
            }
            
        });
    });

});



router.post(url, auth, (req, res) => {
    pool.getConnection(function (err, connection){

        const formData = req.body;
       if(!req.body.url){
           return res.status(422).json({"error": "required field(s) missing"});
       }else{
            connection.query(`INSERT INTO video (url, rubrique) VALUES (?, ?)`,
            [formData.url, formData.rubrique], (err, results, fields) => {
                connection.release();
                if(err){
                    res.status(200).send(err.message);
                }else{
                    const id = results.insertId;
                    connection.query(`SELECT url, rubrique FROM video WHERE id=?`,[id], (err, results, fields) => {
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

router.put(url + '/:id',auth, (req, res) => {
    const id = req.params.id;

    pool.getConnection(function (err, connection){
        const formData = req.body;

        connection.query(`UPDATE video SET url=?,rubrique=? WHERE id=?`,[formData.url, formData.rubrique, id], (err, results, fields) => {
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

router.delete(url + '/:id',auth, (req, res) => {
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