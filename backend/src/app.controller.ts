import { Controller, Get, Module } from '@nestjs/common';
import { AppService } from './app.service';
import mongoose from 'mongoose';

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
      await mongoose.connect('mongodb+srv://Pablo:gaxSCEoBEYAgTn3x@atlascluster.nidn1nj.mongodb.net/?retryWrites=true&w=majority', {
      });
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      process.exit(1);
    }
  }
}
