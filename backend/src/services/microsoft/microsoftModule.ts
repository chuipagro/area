import { Module } from '@nestjs/common';
import { MicrosoftService } from './microsoft.service';
import { MicrosoftController } from './microsoftController';

@Module({
  imports: [],
  providers: [MicrosoftService],
  exports: [MicrosoftService],
  controllers: [MicrosoftController],
})
export class MicrosoftModule {}
