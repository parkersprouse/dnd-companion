// eslint-disable-next-line
'use strict';

var config = {
  dbConfig: {
    host: process.env.RM_DB_HOST,
    port: process.env.RM_DB_PORT,
    database: process.env.RM_DB_NAME,
    user: process.env.RM_DB_USER,
    password: process.env.RM_DB_PASS,
    ssl: process.env.RM_DB_SSL
  },
  jwtSecret: process.env.RM_JWT_SECRET
}

module.exports = config
