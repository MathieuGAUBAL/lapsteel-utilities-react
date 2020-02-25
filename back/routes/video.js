const express = require('express');
const router = express.Router();


router.get('/videos', (req, res) => {
    res.status(200).send('toutes les videos');
});

module.exports = router;