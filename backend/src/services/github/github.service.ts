import axios from 'axios';
import qs from 'qs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubService {
  private clientID: string | undefined;
  private clientSECRET: string | undefined;
  private callbackURL: string | undefined;
  private code: string | null;

  constructor(private configService: ConfigService) {
    this.clientID = this.configService.get<string>('GITHUB_CLIENT_ID');
    this.clientSECRET = this.configService.get<string>('GITHUB_CLIENT_SECRET');
    this.callbackURL = this.configService.get<string>('GITHUB_CALLBACK_URL');
    if (!this.clientID) {
      throw new Error('GITHUB_CLIENT_ID is undefined');
    }
    if (!this.clientSECRET) {
      throw new Error('GITHUB_CLIENT_SECRET is undefined');
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.code = urlParams.get("code");

    //if (code) {
    //    handleLogin(code);
    //}
  }

  async postToken(): Promise<any> {
    const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${this.clientID}&scope=user&redirect_uri=${this.callbackURL}`;

    console.log(this.code);
    return await axios.get(githubOAuthURL, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response: any) => {
      return response.data.access_token;
    });
  }

  async getUserProfileData(): Promise<any> {
    const access_token = await this.postToken();
    const url = `https://api.github.com/user`;

    return await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'User-Agent': 'Area',
    }
    }).then((response: any) => {
      return response.data;
    });
  };

}
