import axios from 'axios';
import qs from 'qs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordBotService {

  constructor(private configService: ConfigService) {
  }

  async getBotAlive(): Promise<any> {
    const url = `http://backend_discord_service:9999/`;

    return await axios.get(url, {
    }).then((response: any) => {
      return response.data;
    });
  };

  async postSendMessage(channel_id: string, message: string): Promise<any> {
    const url = `http://backend_discord_service:9999/sendMessage`;

    return await axios.post(url, {
      'channel_id':channel_id,
      'message':message
    }).then((response: any) => {
      return response.data;
    });
  };

}
