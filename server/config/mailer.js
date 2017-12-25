const config = require('./index');

const SparkPost = require('sparkpost');
const mailer = new SparkPost(config.sparkpostKey);

module.exports = mailer;