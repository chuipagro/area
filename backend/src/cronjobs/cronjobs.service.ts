import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AreaSchema, ActionSchema } from '../models/area.model';

@Injectable()
export class CronjobsService {
  private readonly logger = new Logger(CronjobsService.name);
  private readonly AreaSchema = [
    {
        title: "First Area",
        active: true,
        createdBy: "SteciFatiguant",
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
  handleCron() {
    for (var area of this.AreaSchema) {
        if (area["active"])
            console.log(area); // prints values: 10, 20, 30, 40
    }
    console.log('Called every minute');
  }
}
