
const dotenv = require('dotenv').config();
const app = require('./app');


app.listen(dotenv.parsed.PORT_SERVER, () => {
    console.log(`Server is listening on`, dotenv.parsed.PORT_SERVER);
  });



