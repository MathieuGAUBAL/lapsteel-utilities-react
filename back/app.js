const express = require('express');
const app = express();
const video = require('./routes/video');
const image = require('./routes/image');
const user = require('./routes/user');
const lapsteelator = require('./routes/lapsteelator');
const cors = require('cors');


app.use(cors())

app.use('/api', video);
app.use('/api', image);
app.use('/api', user);
app.use('/api', lapsteelator);

module.exports = app;