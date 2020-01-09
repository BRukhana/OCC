/**
 * This is the entry point for the server-side extension.
 *
 * This code is using the ECMAScript features supported
 * in the version 6.11.3 of NodeJS (Present in OCC 17.6.3.1).
 *
 * To check which ECMAScript features you can use,
 * my suggestion get the NodeJS version from the OCC environment
 * you are working now. To do so, you can make a GET request
 * to "/ccadminx/v1/versions".
 *
 * With the version, access https://node.green/ and check which
 * features you can use.
 *
 * Cheers ;)
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');

// Export Express 4 style sub-application in order to be embedded in OCCS server-side extension architecture
const sse = new express.Router();
sse.use(bodyParser.json({})); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

try {
  // Load all routes
  require('./routes')(sse);
} catch (e) {
  logger.error(e.message);
}

module.exports = sse;
