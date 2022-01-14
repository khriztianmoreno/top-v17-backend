const nodemailer = require('nodemailer');

const { log } = require('../utils/logger');

async function sendMailNodeMailer(data) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.STMP_SERVER_USER,
      pass: process.env.STMP_SERVER_PASSWORD,
    },
  });

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"No constestar 👨🏼‍🏫" <noreply@makeitreal.camp>', // sender address
      to: 'khriztianmoreno@hotmail.com', // list of receivers
      subject: 'Hello World ✔', // Subject line
      text: `
      Hello world?
      How are u?
      I hope you are doing well
      Bye
    `, // plain text body
      html: `
      <style>
        .color {
          color: green;
        }
      </style>
      <b>Hello world?</b>
      <p>How are u?</p>
      <p style="color: red;">I hope you are doing well</p>
      <p class="color">Bye</p>
    `, // html body
    });

    return info.messageId;
  } catch (error) {
    log.error(error);
    return null;
  }
}

module.exports = {
  sendMailNodeMailer,
};
