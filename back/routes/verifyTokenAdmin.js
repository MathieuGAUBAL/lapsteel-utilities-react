const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = function(req, res, next){
    const header = req.headers['authorization'];
    if(header !== undefined){
        let tab = header.split(' ');
        let token = tab[1];
       
        req.token = token;
        jwt.verify(token, dotenv.parsed.JWT_SECRET_ADMIN, (err, authenticationData) => {
            token = authenticationData;
            if(err){
                res.send('Unauthorized : ' + err.toString());
            }
            else {
                req.authenticationData = authenticationData;
                next();
            }
        });
    }
    else {

        res.status(401).send('Unauthorized');
       
    }
}