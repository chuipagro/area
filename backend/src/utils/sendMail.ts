import * as nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, text: string, from: string) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pablo06082000@gmail.com',
      pass: 'swhc qeeb cwni xqls',
    },
  });

  let mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
  };
  let info = await transporter.sendMail(mailOptions);
  console.log('Message envoyé : %s', info.messageId);
}
