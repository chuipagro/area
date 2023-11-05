import * as nodemailer from 'nodemailer';
import { AuthorizationCode } from 'simple-oauth2';

export async function sendEmail(to: string, subject: string, text: string) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pablo06082000@gmail.com',
      pass: 'swhc qeeb cwni xqls',
    },
  });

  let mailOptions = {
    to: to,
    subject: subject,
    text: text,
  };
  let info = await transporter.sendMail(mailOptions);
}
