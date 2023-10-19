import { Injectable } from '@nestjs/common';
import { sendEmail } from '../../utils/sendMail';

@Injectable()
export class MailService {
  async sendMail(dest: string, from: string, content: string, subject: string) {
    await sendEmail(dest, subject, content, from);
  }
}
