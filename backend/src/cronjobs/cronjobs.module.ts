import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { ServicesService } from '../services/services.service';
import { RiotService } from '../services/riot/riot.service';
import { MailService } from '../services/mail/mail.service';

@Module({
  providers: [CronjobsService],
})
export class CronjobsModule {}
