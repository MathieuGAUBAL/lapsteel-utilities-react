const express = require('express');
const app = express();
const video = require('./routes/video');
const bodyParser = require('body-parser');



app.use(video);
app.use(bodyParser);

const cors = require('cors');




module.exports = app;