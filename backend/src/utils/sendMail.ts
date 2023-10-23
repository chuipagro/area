import * as nodemailer from 'nodemailer';
import { AuthorizationCode } from 'simple-oauth2';

export async function sendEmail(to: string, subject: string, text: string, from: string) {
  const client = new AuthorizationCode({
    client: {
      id: '3289b579-124a-402d-8408-cba90476b55d',
      secret: '783921fc-80f0-4ce8-a232-be6f2ac0cfab',
    },
    auth: {
      tokenHost: 'https://login.microsoftonline.com',
      authorizePath: '/common/oauth2/v2.0/authorize',
      tokenPath: '/common/oauth2/v2.0/token'
    }
  });

  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'pablo0675@hotmail.com',
      pass: '',
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
