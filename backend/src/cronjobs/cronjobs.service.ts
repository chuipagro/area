import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronjobsService {
  private readonly logger = new Logger(CronjobsService.name);

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {

    console.log('Called every minute');
  }
}
