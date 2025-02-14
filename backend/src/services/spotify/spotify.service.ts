import axios from 'axios';
import qs from 'qs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserModel } from '../../models/users.model';

@Injectable()
export class SpotifyService {
  private clientID: string | undefined;
  private clientSECRET: string | undefined;
  private authTOKEN: string | undefined;
  private spotifyTOKEN: string | undefined;

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

  async postTokenSpotify(): Promise<any> {
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
  

  async getAudioFeaturesTrack(track_id: string): Promise<any> {
    const access_token = this.authTOKEN;
    const url = `https://api.spotify.com/v1/audio-features/${track_id}`;

    return await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    }).then((response: any) => {
      return response.data;
    });
  };

  async getNewReleases(country: string, limit: number, offset: number): Promise<any> {
    const access_token = this.authTOKEN;
    const url = `https://api.spotify.com/v1/browse/new-releases?country=${country}&limit=${limit}&offset=${offset}`;

    return await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    }).then((response: any) => {
      return response.data;
    });
  };
  
  async createPlaylist(username :string, name: string, description: string, publicPlaylist: boolean): Promise<any> {
    const access_token = this.authTOKEN;
    const url = `https://api.spotify.com/v1/users/${username}/playlists`;

    return await axios.post(url, {
      'name': name,
      'description': description,
      'public': publicPlaylist
    }, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    }).then((response: any) => {
      return response.data;
    });
  }
}
