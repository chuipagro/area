import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AreaService } from './area.service';
import { AreaSchema } from '../models/area.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Area', schema: AreaSchema }]),
  ],
  controllers: [AreaController],
  exports: [AreaService],
  providers: [AreaService],
})
export class AreaModule {}
