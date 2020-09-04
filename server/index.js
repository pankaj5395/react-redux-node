import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import router from './router';
import config from './config';
import session from 'express-session';

import Queue from './component/queue';
import RPC from './component/rpc';

global.database = require("./lib/database");

global.queue = new Queue();
global.RPC  = new RPC();
//global.RPC = client;

var cors = require('cors')

const app = express();

// Set static file location for production
// app.use(express.static(__dirname + '/public'));

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan


// Enable CORS from client-side 
app.use(cors());


// Database Setup
database.sequelizer.sync();

/*const sessionParameters = session({
      secret: config.secret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        path: "/",
        secure: true
      }
    });
    app.use(sessionParameters);*/
router(app);

// Start the server
const server = app.listen(config.port);
console.log(`Your server is running on port ${config.port}.`);

// necessary for testing
module.exports = server;