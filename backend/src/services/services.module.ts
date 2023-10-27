import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/users.model';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule { }
