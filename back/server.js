
const connection = require('./config.js');
const app = require('./app');
const pool = require('./config.js');

app.listen(5000, () => {
    console.log(`Server is listening on 5000`);
  });



