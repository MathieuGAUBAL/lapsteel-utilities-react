const express = require('express');
const router = express.Router();
const pool = require('../config.js');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/videos', (req, res) => {
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

router.get('/videos/:id', (req, res) => {
    const id = req.params.id;
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM video WHERE id=?`,[id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                res.status(200).send(results);
            }
            
        });
    });

});

router.post('/videos', (req, res) => {
    pool.getConnection(function (err, connection){

        const formData = req.body;
       
        connection.query(`INSERT INTO video (url) VALUES (?)`,[formData.url], (err, results, fields) => {
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
    });

});

router.put('/videos/:id', (req, res) => {
    const id = req.params.id;

    pool.getConnection(function (err, connection){
        const formData = req.body;

        connection.query(`UPDATE video SET url=? WHERE id=?`,[formData.url, id], (err, results, fields) => {
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
    });
});

router.delete('/videos/:id', (req, res) => {
    const id = req.params.id;
    pool.getConnection(function (err, connection){
        connection.query(`SELECT * FROM video WHERE id=?`,[id], (err, results, fields) => {
            connection.release();
            if(err){
                res.status(200).send(err.message);
            }else{
                let output = results;
                pool.getConnection(function (err, connection){
                    connection.query(`DELETE FROM video WHERE id=?`,[id], (err, results, fields) => {
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
router.delete('/videos', (req, res) => {
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