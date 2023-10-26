import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AreaService } from './area.service';
import { AreaModel, AreaSchema } from '../models/area.model';
import { ServicesService } from '../services/services.service';
import { CronjobsService } from '../cronjobs/cronjobs.service';
import { CronjobsModule } from '../cronjobs/cronjobs.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Area', schema: AreaSchema }]),
    AreaModel,
  ],
  controllers: [AreaController],
  exports: [AreaService],
  providers: [AreaService],
})
export class AreaModule {}
