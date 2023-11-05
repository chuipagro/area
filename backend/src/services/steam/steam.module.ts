import { Module } from '@nestjs/common';
import { SteamService } from './steam.service';
import { SteamController } from './steam.controller';

@Module({
  imports: [
  ],
  providers: [SteamService],
  exports: [SteamService],
  controllers: [SteamController],
})
export class SteamModule {}
