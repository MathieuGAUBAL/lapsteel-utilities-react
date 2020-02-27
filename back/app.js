const express = require('express');
const app = express();
const video = require('./routes/video');
const image = require('./routes/image');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors())

app.use('/api', video);
app.use('/api', image);

module.exports = app;