/**
 * This is the entry point for the server-side extension.
 *
 * This code is using the ECMAScript features supported
 * in the version 6.11.3 of NodeJS (Present in OCC 17.6.3.1).
 *
 * To check which ECMAScript features you can use,
 * my suggestion is to get the NodeJS version from the OCC environment
 * you are working now. To do so, you can make a GET request
 * to "/ccadminx/v1/versions".
 *
 * With the version, access https://node.green/ and check which
 * features you can use.
 *
 * Also, you can set your local environment to use the same NodeJS version
 * to make the development as closest possible with the OCC extension server.
 *
 * Cheers ;)
 */
const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const logger = winston.createLogger({
  transports :[new winston.transports.Console()]
})

const app = express();
app.use((req, res, next) => {
  if (!res.locals) {
    res.locals = {};
  }

  // http://expressjs.com/en/api.html#res.locals
  // use res.locals to pass object between main and sub apps
  res.locals.logger = logger;
  next();
});

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// Set sub-app path to simulate the OCC server behavior
app.use('/ccstorex/custom', require('./app/index'));

// Read port from command line, config, or use the default
const port = process.argv[2] || (process.env.npm_package_config_port || 3000);

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
