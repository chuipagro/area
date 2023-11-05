import axios from 'axios';
import qs from 'qs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CronGestion } from '../../utils/cronGestion';

import cron = require('node-cron');

@Injectable()
export class WeatherService {
  private apiKEY: string | undefined;

  constructor(private configService: ConfigService) {
    this.apiKEY = this.configService.get<string>('WEATHER_API_KEY');
    if (!this.apiKEY) {
      throw new Error('WEATHER_API_KEY is undefined');
    }
  }

  async getCityInsee(city: string): Promise<any> {
    const url = `https://api.meteo-concept.com/api/location/cities?token=${this.apiKEY}&search=${city}`;

    return await axios.get(url).then((response: any) => {
      return response.data.cities[0].insee;
    });
  }

  async getTodayWeather(city: string): Promise<any> {
    const insee = await this.getCityInsee(city)
    console.log(city, insee)
    const url = `https://api.meteo-concept.com/api/forecast/daily?token=${this.apiKEY}&insee=${insee}`;

    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async waitForNewWeather(city: string) : Promise<Object | null> {
    const currentWeather = await this.getTodayWeather(city.toString());
    return new Promise<Object | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";

      const checkForNewGamePlay = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("H6", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const newWeather = await this.getTodayWeather(city.toString());
          if (currentWeather != newWeather) {
            const lastWeather = newWeather
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
      checkForNewGamePlay();
    });
  }

}
