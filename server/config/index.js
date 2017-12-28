// eslint-disable-next-line
'use strict';

var config = {
  dbConfig: {
    host: process.env.DND_DB_HOST,
    port: process.env.DND_DB_PORT,
    database: process.env.DND_DB_NAME,
    user: process.env.DND_DB_USER,
    password: process.env.DND_DB_PASS,
    ssl: process.env.DND_DB_SSL
  },
  jwtSecret: process.env.DND_JWT_SECRET,
  sparkpostKey: process.env.SPARKPOST_API_KEY
}

module.exports = config
