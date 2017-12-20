// eslint-disable-next-line
'use strict';

function generateJwtPayload(data) {
  return {
    id: data.id,
    email: data.email,
    username: data.username,
    name: data.name,
    hash: data.pw_hash
  }
}

module.exports = {
  generateJwtPayload: generateJwtPayload
}
