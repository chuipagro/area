import { Injectable } from '@nestjs/common';
import { sendEmail } from '../../utils/sendMail';

@Injectable()
export class MailService {
  async sendMail(dest: string, content: string, subject: string) {
    await sendEmail(dest, subject, content);
  }
}
