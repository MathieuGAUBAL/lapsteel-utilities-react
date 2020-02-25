const express = require('express');
const app = express();
const video = require('./routes/video');
const bodyParser = require('body-parser');
const connection = require('./config.js');


app.use(video);
app.use(bodyParser);

const cors = require('cors');


const server = app.listen(5000, () => {
    console.log(`Server is listening on 5000`);
  });

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

  module.exports = server;