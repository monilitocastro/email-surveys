const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const User = require('./models/user');

mongoose.connect(keys.databaseURI);

require('./services/passport');
require('./models/user');


const app = express();


app.use(morgan('combined'));
app.use(cookieSession({
    keys: [keys.cookieKey],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
app.use(passport.initialize());
app.use(passport.session());


require('./routes')(app);

const port = process.env.PORT || 5000;

app.listen(port);
console.log('listening on port ' + port + ' ...');