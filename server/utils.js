// eslint-disable-next-line
'use strict';

function generateJwtPayload(data) {
  const payload = {
    id: data.id,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    hash: data.pw_hash
  };

  return payload;
}

module.exports = {
  generateJwtPayload: generateJwtPayload
}
