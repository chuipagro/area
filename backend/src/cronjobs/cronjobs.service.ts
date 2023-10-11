import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AreaSchema, ActionSchema } from '../models/area.model';
import { allServices } from '../models/servicesModel';
import { ServicesService } from '../services/services.service';
import { RiotService } from '../services/riot/riot.service';
import { MailService } from '../services/mail/mail.service';
import { SpotifyService } from '../services/spotify/spotify.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CronjobsService {
  private readonly logger = new Logger(CronjobsService.name);
  private readonly AreaSchema = [
    {
        title: "First Area",
        active: true,
        createdBy: "SteciFatiguant",
        action: {
          type: 1,
          service: 1,
        },
        reaction: {
          type: 1,
          service: 3,
        }
    },
    {
        title: "string",
        active: false,
        createdBy: "string",
        action: {
          type: 0,
          service: 0,
        },
        reaction: {
          type: 0,
          service: 0,
        }
    },
    {
        title: "string",
        active: false,
        createdBy: "string",
        action: {
          type: 0,
          service: 0,
        },
        reaction: {
          type: 0,
          service: 0,
        }
    },
  ];

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    for (var area of this.AreaSchema) {
        if (area["active"]) {
            await launchArea(area);
        }
    }
  }
}

async function launchArea(area: any) {
  const configService = new ConfigService()
  const riotService = new RiotService(configService);
  const mailService = new MailService();
  let actionData: any;

  console.log(area.action)
  console.log(area.reaction)

  switch (area.action.service) {
    case 1:
      switch (area.action.type) {
        case 1:
          actionData = await riotService.getSummonerByName("pablo0675");
          break;
        default:
          console.log("action not found");
          break;
      }
      break;
    default:
      console.log("service not found");
      break
  }

  switch (area.reaction.service) {
    case 3:
      switch (area.reaction.type) {
        case 1:
          await mailService.sendMail("laetitia.bousch@epitech.eu", actionData.toString(), "riot");
          break;
        default:
          console.log("action not found");
          break;
      }
      break;
    default:
      console.log("service not found");

  }
}
