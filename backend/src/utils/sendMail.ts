import * as nodemailer from 'nodemailer';
import { AuthorizationCode } from 'simple-oauth2';

export async function sendEmail(to: string, subject: string, text: string, from: string) {
  let transporter = nodemailer.createTransport({
    service: 'hotmail',
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
