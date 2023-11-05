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

}
