import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { ServicesService } from '../services/services.service';
import { RiotService } from '../services/riot/riot.service';
import { MailService } from '../services/mail/mail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/users.model';
import { AreaService } from '../area/area.service';
import { AreaModule } from '../area/area.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Area', schema: UserSchema}]),
    AreaModule,
  ],
  providers: [CronjobsService, AreaService, ServicesService],
})
export class CronjobsModule {}
