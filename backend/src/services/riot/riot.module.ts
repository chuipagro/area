import { Module } from '@nestjs/common';
import { RiotService } from './riot.service';
import { RiotController } from './riot.controller';

@Module({
  imports: [
  ],
  providers: [RiotService],
  exports: [RiotService],
  controllers: [RiotController],
})
export class RiotModule {}
