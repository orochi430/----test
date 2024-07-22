'use strict'
module.exports = {
  NODE_ENV: process.env.npm_config_project ? '"projectProduction"' : '"production"'
}
