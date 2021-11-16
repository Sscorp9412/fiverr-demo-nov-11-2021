/*
-------------------- 
jshint esversion:6
--------------------
*/

// External Packages
const express=require('express'); // express application call
const cors = require('cors') // used to access cors of different browsers calls
const app = express(); // instance of express
const http = require('http').createServer(app) //http server
const bodyParser=require('body-parser'); // previous used for body parser
const { Client }=require('pg'); // postgreSQL client connection
const session = require("express-session"); // used to store sessions
const { createProxyMiddleware } = require('http-proxy-middleware'); // for connecting proxy server
const multer = require("multer"); // multer used for different user inputs
require('dotenv').config(); // process.env call
const port = process.env.PORT || 4000; //port enabled
var waiting=null;

// Exported modules
const logs = require('./utilities/console'); // env controlled log function
const appRoutes = require('./routes/index'); // all routes
const db = require('./middlewares/postgres'); 

app.use(cors()); // added cors in express instance
app.use(bodyParser.urlencoded({extended: true})); // added body parser in express instance
app.use(bodyParser.json());
app.use(express.static("assets")); // local file path for server
app.use('/api', appRoutes)

http.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
