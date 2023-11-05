import axios from 'axios';
import qs from 'qs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CronGestion } from '../../utils/cronGestion';

import cron = require('node-cron');

@Injectable()
export class NasaService {
  private apiKEY: string | undefined;

  constructor(private configService: ConfigService) {
    this.apiKEY = this.configService.get<string>('NASA_API_KEY');
    if (!this.apiKEY) {
      throw new Error('NASA_API_KEY is undefined');
    }
  }

  async getMarsWeather(): Promise<any> {
    const url = `https://api.nasa.gov/insight_weather/?api_key=${this.apiKEY}&feedtype=json&ver=1.0`;

    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async waitForNextWeatherInfoMars() : Promise<Object | null> {
    const weatherInfo = await this.getMarsWeather();
    return new Promise<Object | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";

      const checkForNextWeatherInfoMars = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("H1", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const newWeatherInfo = await this.getMarsWeather();
          if (weatherInfo != newWeatherInfo) {
            const lastWeather = weatherInfo.validity_checks[0]
            if (!lastWeather) {
                return null;
            }
            resolve(lastWeather);
          }
          return null;
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      }
      checkForNextWeatherInfoMars();
    });
  }

}
