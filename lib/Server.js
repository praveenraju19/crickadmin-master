const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const fs = require('fs');
const serverDebug = require('debug')('server');
const mssqlConnect = require('./Mssql/mssqlConnect.js').mssqlConnect
const error = require('./debug/error.js');
const port = require('../Config/config.js').config.router.PORT;
const initializeRouter = require('./Modules/Routermodule.js').initializeRouter;


app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(router);
app.use(cors())
mssqlConnect();

initializeRouter(app)

app.use(error);

app.listen(port, () => {
  serverDebug(`Listerning on port: ${port}`);
});


module.exports = app;