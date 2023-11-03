import { Module } from '@nestjs/common';
import { DiscordBotService } from './discord-bot.service';
import { DiscordBotController } from './discord-bot.controller';

@Module({
  imports: [
  ],
  providers: [DiscordBotService],
  exports: [DiscordBotService],
  controllers: [DiscordBotController],
})
export class DiscordBotModule {}
