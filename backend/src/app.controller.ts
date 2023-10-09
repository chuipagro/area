import { Controller, Get, Module } from '@nestjs/common';
import { AppService } from './app.service';
import mongoose from 'mongoose';
import * as process from 'process';
import { sendEmail } from './utils/sendMail';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.connectToDatabase().then(r => console.log('Connected to MongoDB'));
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  private async connectToDatabase() {
    try {
      if (process.env.MONGO_URI === undefined) {
        throw new Error('MONGO_URI is undefined');
      }
      await mongoose.connect(process.env.MONGO_URI.toString(), {
      });
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      process.exit(1);
    }
  }
}
