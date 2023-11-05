import { Module } from '@nestjs/common';
import { MinecraftService } from './minecraft.service';
import { MinecraftController } from './minecraft.controller';

@Module({
  imports: [
  ],
  providers: [MinecraftService],
  exports: [MinecraftService],
  controllers: [MinecraftController],
})
export class MinecraftModule {}
