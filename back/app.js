const express = require('express');
const app = express();
const video = require('./routes/video');
const image = require('./routes/image');
const user = require('./routes/user');
const cors = require('cors');


app.use(cors())

app.use('/api', video);
app.use('/api', image);
app.use('/api', user);

module.exports = app;