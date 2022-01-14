const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const { log } = require('../utils/logger');

async function sendEmail(data) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: data.to, // Change to your recipient
    from: 'No Reply<cristian.moreno@makeitreal.camp>', // Change to your verified sender
    subject: data.subject,
    template_id: data.template_id,
    dynamic_template_data: data.dynamic_template_data,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error(error);
  }
}

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
  sendEmail,
};
