/**
 * Module dependencies.
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

let config = require('config'); // get our config file


let port = process.env.PORT || config.port; // used to create, sign, and verify tokens
mongoose.connect(config.database, { useNewUrlParser: true }); // connect to database
console.log("MongoDb Connection: ", config.database)
if (port == 13000 && process.env.NODE_ENV === 'default') {
    mongoose.set('debug', true);
}

app.set('superSecret', config.userSecret); // secret variable


// use body parser so we can get info from POST and/or URL parameters
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

//app.use(bodyParser.json());
mongoose.set('useCreateIndex', true)


// use morgan to log requests to the console
app.use(morgan('dev'));
//app.use(morgan('combined', { stream: winston.stream }));

let route = require('./route');
app.use('/api', route);

// =======================
// start the server ======
// =======================
app.listen(port, '0.0.0.0');
console.log('Magic happens at http://localhost:' + port);

module.exports = app;