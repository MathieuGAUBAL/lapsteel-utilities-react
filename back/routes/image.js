const express = require('express');
const router = express.Router();
const pool = require('../config.js');
const bodyParser = require('body-parser');
const auth = require('./verifyTokenAdmin');



router.get('/image', (req, res) => {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT * FROM image`, (err, results, fields) => {
            connection.release();
            if (err) {
                res.status(200).send(err.message);
            } else {
                res.status(200).send(results);
            }

        });
    });

});


router.get('/image/:id', (req, res) => {
    const id = req.params.id;
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT * FROM image WHERE id=?`, [id], (err, results, fields) => {
            connection.release();
            if (err) {
                res.status(200).send(err.message);
            } else {
                res.status(200).send(results);
            }
        });
    });
});

router.post('/image', auth, (req, res) => {
    pool.getConnection(function (err, connection) {

        const formData = req.body;

        connection.query(`INSERT INTO image (name,url,alt) VALUES (?,?,?)`,
            [formData.name, formData.url, formData.alt], (err, results, fields) => {
                connection.release();
                if (err) {
                    res.status(200).send(err.message);
                } else {
                    const id = results.insertId;
                    connection.query(`SELECT * FROM image WHERE id=?`, [id], (err, results, fields) => {
                        if (err) {
                            res.status(200).send(err.message);
                        } else {
                            res.json(results)
                        }
                    });
                }
            });
    });

});

router.put('/image/:id', auth, (req, res) => {
    const id = req.params.id;

    pool.getConnection(function (err, connection) {
        const formData = req.body;
        connection.query(`UPDATE image SET name=?,url=?,alt=? WHERE id=?`, [formData.name, formData.url, formData.alt, id], (err, results, fields) => {
            connection.release();
            if (err) {
                res.status(200).send(err.message);
            } else {
                connection.query(`SELECT * FROM image WHERE id=?`, [id], (err, results, fields) => {
                    if (err) {
                        res.status(200).send(err.message);
                    } else {
                        res.json(results)
                    }
                });
            }
        });
    });
});

router.delete('/image/:id', auth, (req, res) => {
    const id = req.params.id;
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT * FROM image WHERE id=?`, [id], (err, results, fields) => {
            connection.release();
            if (err) {
                res.status(200).send(err.message);
            } else {
                let output = results;
                pool.getConnection(function (err, connection) {
                    connection.query(`DELETE FROM image WHERE id=?`, [id], (err, results, fields) => {
                        if (err) {
                            res.status(200).send(err.message);
                        } else {
                            res.send(output);
                        }
                    });
                });
            }
        });
    });
});




module.exports = router;