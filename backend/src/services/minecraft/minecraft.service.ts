import axios from 'axios';
import qs from 'qs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CronGestion } from '../../utils/cronGestion';

import cron = require('node-cron');

@Injectable()
export class MinecraftService {
  private defaultPort: string | undefined;

  constructor(private configService: ConfigService) {
    this.defaultPort = "25565";
  }

  async getServerInfo(serverIP: string): Promise<any> {
    const url = `https://minecraft-api.com/api/ping/${serverIP}/${this.defaultPort}/json`;

    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async getNumberConnectedPlayers(serverIP: string): Promise<any> {
    const url = `https://minecraft-api.com/api/ping/online/${serverIP}/${this.defaultPort}/json`;

    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async getServerAvailaibleVersion(serverIP: string): Promise<any> {
    const url = `https://minecraft-api.com/api/ping/version/${serverIP}/${this.defaultPort}/json`;

    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async waitForNewConnection(serverIP: string) : Promise<Object | null> {
    const numberPlayers = await this.getNumberConnectedPlayers(serverIP.toString());
    return new Promise<Object | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";

      const checkForNewConnection = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("M1", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const currentNumberPlayers = await this.getNumberConnectedPlayers(serverIP.toString());
          if (numberPlayers < currentNumberPlayers) {
            const numberNewPlayers = numberPlayers.online - currentNumberPlayers.online
            resolve(numberNewPlayers);
          }
          return null;
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      }
      checkForNewConnection();
    });
  }

  async waitForNewDisconnection(serverIP: string) : Promise<Object | null> {
    const numberPlayers = await this.getNumberConnectedPlayers(serverIP.toString());
    return new Promise<Object | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";

      const checkForNewDisconnection = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("M1", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const currentNumberPlayers = await this.getNumberConnectedPlayers(serverIP.toString());
          if (numberPlayers > currentNumberPlayers) {
            const numberNewPlayers = currentNumberPlayers.online - numberPlayers.online
            resolve(numberNewPlayers);
          }
          return null;
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      }
      checkForNewDisconnection();
    });
  }

  async waitForNewVersion(serverIP: string) : Promise<Object | null> {
    const serverVersions = await this.getServerAvailaibleVersion(serverIP.toString());
    return new Promise<Object | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";

      const checkForNewVersion = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("H6", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const currentServerVersions = await this.getServerAvailaibleVersion(serverIP.toString());
          if (serverVersions != currentServerVersions) {
            resolve(currentServerVersions);
          }
          return null;
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      }
      checkForNewVersion();
    });
  }

}
