import { Injectable } from '@nestjs/common';
import { sendEmail } from '../../utils/sendMail';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MicrosoftService
{

  constructor(private configService: ConfigService) {}
  async getAccessToken() {
    const clientId = this.configService.get<string>('CLIENT_ID');
    const clientSecret = this.configService.get<string>('CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      throw new Error('CLIENT_ID or CLIENT_SECRET is undefined');
    }

    const credentials = {
      client: {
        id: clientId,
        secret: clientSecret,
      },
      auth: {
        tokenHost: 'https://login.microsoftonline.com',
        authorizePath: 'common/oauth2/v2.0/authorize',
        tokenPath: 'common/oauth2/v2.0/token',
      },
    };

    const oauth2 = require('simple-oauth2').create(credentials);

    const tokenConfig = {
      scope: 'user.read',
    };

    try {
      const result = await oauth2.clientCredentials.getToken(tokenConfig);
      const accessToken = oauth2.accessToken.create(result);
      return accessToken;
    } catch (error) {
      console.log('Access Token error', error.message);
    }
  }
  
  async sendMail(dest: string, content: string, subject: string) {
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: "pablo0675@hotmail.com",
        pass: Buffer.from('UGFibG9Cb2huYW56YQ==', 'base64').toString('ascii')
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });
    
    let mailOptions = {
      from: 'pablo0675@hotmail.com',
      to: dest,
      subject: subject,
      text: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message envoyé: %s', info.messageId);
    });
  }
  
}
