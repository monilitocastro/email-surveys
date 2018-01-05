const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));

require('./routes')(app);

const port = process.env.PORT || 5000;



app.listen(port);
console.log('listening on port ' + port + ' ...');