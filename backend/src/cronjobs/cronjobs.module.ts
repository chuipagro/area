import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { ServicesService } from '../services/services.service';
import { RiotService } from '../services/riot/riot.service';
import { MailService } from '../services/mail/mail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/users.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Area', schema: UserSchema}]),
  ],
  providers: [CronjobsService, ServicesService],
})
export class CronjobsModule {}
