// eslint-disable-next-line
'use strict';

const pgp = require('./db').pgp;

module.exports = {
  db_err_duplicate: 'SequelizeUniqueConstraintError',
  http_ok: 200,
  http_no_content: 204,
  http_bad_request: 400,
  http_unauthorized: 401,
  http_server_error: 500
}
