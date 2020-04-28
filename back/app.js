const express = require('express');
const app = express();
const video = require('./routes/video');
const image = require('./routes/image');
const user = require('./routes/user');
const admin = require('./routes/admin');
const token = require('./routes/token');
const login_admin = require('./routes/login_admin');
const login_user = require('./routes/login_user');

const lapsteelator = require('./routes/lapsteelator');
const vitrine = require('./routes/vitrine');
const homepage = require('./routes/homepage');
const cors = require('cors');


app.use(cors());


app.use('/api', video);
app.use('/api', image);
app.use('/api', user);
app.use('/api', lapsteelator);
app.use('/api', admin);
app.use('/api', vitrine);
app.use('/api', homepage);

app.use('/api', token);

app.use('/api', login_admin);
app.use('/api', login_user);

module.exports = app;