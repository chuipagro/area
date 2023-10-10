import axios from 'axios';
import qs from 'qs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyService {
  private clientID: string | undefined;
  private clientSECRET: string | undefined;
  private authTOKEN: string | undefined;

  constructor(private configService: ConfigService) {
    this.clientID = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    this.clientSECRET = this.configService.get<string>('SPOTIFY_CLIENT_SECRET');
    if (!this.clientID) {
      throw new Error('SPOTIFY_CLIENT_ID is undefined');
    }
    if (!this.clientSECRET) {
      throw new Error('SPOTIFY_CLIENT_SECRET is undefined');
    }
    this.authTOKEN = Buffer.from(`${this.clientID}:${this.clientSECRET}`, 'utf-8').toString('base64');
  }

  async postToken(): Promise<any> {
    const url = `https://accounts.spotify.com/api/token`;

    return await axios.post(url, {'grant_type':'client_credentials'}, {
      headers: {
        'Authorization': `Basic ${this.authTOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response: any) => {
      return response.data.access_token;
    });
  }

}
