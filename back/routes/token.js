const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const parser = require("body-parser");


router.use(parser.urlencoded({ extended: false }))
 
// parse application/json
router.use(parser.json())


router.post(
    '/token',
    (req, res) => {
        let token = req.body.token;
        jwt.verify(token, 'WildCodeSchool!2019Septembre', (err, authenticationData) => {
            if(err){
                res.json({
                    succes: false,
                    token: ""
                });
            }
            else {
                res.json({
                    succes: true,
                    token: token
                });
            }
        });
    }
)

module.exports = router;