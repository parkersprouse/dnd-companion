const config = require('./index');
const SparkPost = require('sparkpost');

const mailer = new SparkPost(config.sparkpostKey);

function sendMail({ subject, content, addresses }, callback) {
  const recipients = [];
  addresses.forEach(addr => {
    recipients.push({ address: addr });
  });

  mailer.transmissions.send({
    content: {
      from: 'parker@mail.parkersprouse.me',
      subject: subject,
      html: '<html><body><p>' + content + '</p><p style="margin-top: 3rem"><i>Please do not reply to this e-mail</i></p></body></html>',
      text: content
    },
    recipients: recipients
  })
  .then(data => {
    console.log(data);
    callback(true);
  })
  .catch(err => {
    console.log(err);
    callback(false);
  });
}

module.exports = sendMail;
