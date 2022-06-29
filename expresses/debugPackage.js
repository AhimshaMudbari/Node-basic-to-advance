const express = require('express');
const app = express();
const debugStarter = require('debug')('app:startup'); //app:startup is namespace
const debugDB = require('debug')('app:db');
const morgan = require('morgan');

//to set export DEBUG=app:startup
if (app.get('env') === 'production') {
  app.use(morgan('tiny'));
  debugStarter('morgan enabled in production...');
}

//database related
//to set export DEBUG=app:db
debugDB('connected to database');

//to see all debug we can use wildcard app:*
//shortcut: app:db nodemon debugPackage.js --> to run the env variable and application at the same time
