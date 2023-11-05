import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
import { CronGestion} from '../../utils/cronGestion';

@Injectable()
export class ClockService {
		private cronGestion = new CronGestion;
		async launchReactionEveryDayAtGivenTime(time:string): Promise<void>	{
				return new Promise((resolve, reject) => {
						const timezone = 'Europe/Paris';
						const callAtGivenTime = () => {
								const cronExpression = this.cronGestion.timeToCronExpression(time);
								const job = cron.schedule(cronExpression, async () => {
										resolve();
								}, {
										scheduled: true,
										timezone,
								});
								job.start();
						}
						callAtGivenTime();
				})
		}
		
		async launchReactionEveryX(time:string): Promise<void>	{
				return new Promise((resolve, reject) => {
						const timezone = 'Europe/Paris';
						const callAtGivenTime = () => {
								const dateAtCreation = new Date().toLocaleDateString();
								const timeAtCreation = new Date().toLocaleTimeString();
								const cronExpression = this.cronGestion.timerToCron(time, timeAtCreation, dateAtCreation);
								const job = cron.schedule(cronExpression, async () => {
										resolve();
								}, {
										scheduled: true,
										timezone,
								});
								job.start();
						}
						callAtGivenTime();
				})
		}
		
		async launchReactionAtPreciseDate(date:string): Promise<void>	{
				return new Promise((resolve, reject) => {
						const timezone = 'Europe/Paris';
						const callAtGivenTime = () => {
								const cronExpression = this.cronGestion.preciseDateToCronExpression(date)
								const job = cron.schedule(cronExpression, async () => {
										resolve();
								}, {
										scheduled: true,
										timezone,
								});
								job.start();
						}
						callAtGivenTime();
				})
		}
}
