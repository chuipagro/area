import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/users.model';
import { ClockController } from './clock/clock.controller';
import { ClockModule } from './clock/clock.module';

@Module({
  controllers: [ServicesController, ClockController],
  providers: [ServicesService],
  imports: [ClockModule]
})
export class ServicesModule { }
