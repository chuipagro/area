import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../Models/users.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Area', schema: UserSchema}]),
  ],
    controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}
