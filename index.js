const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const User = require('./models/user');
const bodyParser = require('body-parser');

mongoose.connect(keys.databaseURI);

require('./services/passport');
require('./models/user');


const app = express();



app.use(morgan('combined'));
app.use(bodyParser.json())
app.use(cookieSession({
    keys: [keys.cookieKey],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
app.use(passport.initialize());
app.use(passport.session());


require('./routes/auth')(app);
require('./routes/stripe')(app);

if(process.env.NODE_ENV === 'production'){
    app.use('/static', express.static('client/build/static'))

    const path = require('path');
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port);
console.log('listening on port ' + port + ' ...');