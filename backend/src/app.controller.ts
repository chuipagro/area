import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { exit } from '@nestjs/cli/actions';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {
    this.connectToDatabase().then(r => console.log('Connected to MongoDB'));
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  private async connectToDatabase() {
    try {
      const mongoUri = this.configService.get<string>('MONGO_URI');
      if (mongoUri === undefined) {
        throw new Error('MONGO_URI is undefined');
      }
      await mongoose.connect(mongoUri, {
      });
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      exit();
    }
  }
}
