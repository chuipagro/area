import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RiotService } from '../services/riot/riot.service';
import { MailService } from '../services/mail/mail.service';
import { SpotifyService } from '../services/spotify/spotify.service';
import { ConfigService } from '@nestjs/config';
import { AreaService } from '../area/area.service';

@Injectable()
export class CronjobsService {
  constructor(private areaService: AreaService) {}
  private readonly logger = new Logger(CronjobsService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
   const AreaSchema = await this.areaService.getAllAreas();
   if (!AreaSchema) {
      throw new Error('Area not found');
   }
    for (const area of AreaSchema) {
      if (area.active && area.launchType === "cron") {
        console.log("cron");
      }
    }
  }
}
