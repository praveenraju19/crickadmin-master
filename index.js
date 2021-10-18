const cors=require('cors')

var debug = {
    'Server': 'server',
    'mongooseConnect': 'MongooseConnect',
    'routerDebug': 'Routermodule',
    'routeErrorDebug': 'RouteError',
    'sqlConnect': 'RouteError'
};

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'DELETE',
    'PUT'
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};


const deb = require('./Config/config.js').debug.Server + ',' + require('./Config/config.js').debug.mongooseConnect;
process.env.DEBUG = '*'//debug.Server+','+debug.mongooseConnect, deb;
var app = require('./lib/Server.js');


process.env.DEBUG = '';
module.exports.app = app;