import { Module } from '@nestjs/common';
import { ClockService } from './clock.service';
import { ClockController } from './clock.controller';

@Module({
  providers: [ClockService],
  controllers: [ClockController],
  exports: [ClockService]
})
export class ClockModule {}
