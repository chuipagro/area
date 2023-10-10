import axios from 'axios';
import qs from 'qs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyService {
  private clientID: string | undefined;
  private clientSECRET: string | undefined;

  constructor(private configService: ConfigService) {
    this.clientID = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    this.clientSECRET = this.configService.get<string>('SPOTIFY_CLIENT_SECRET');
    if (!this.clientID) {
      throw new Error('SPOTIFY_CLIENT_ID is undefined');
    }
    if (!this.clientSECRET) {
      throw new Error('SPOTIFY_CLIENT_SECRET is undefined');
    }
  }


  //const getAuth = async () => {
  //  try{
  //    //make post request to SPOTIFY API for access token, sending relavent info
  //    const token_url = 'https://accounts.spotify.com/api/token';
  //    const data = qs.stringify({'grant_type':'client_credentials'});
  //
  //    const response = await axios.post(token_url, data, {
  //      headers: { 
  //        'Authorization': `Basic ${auth_token}`,
  //        'Content-Type': 'application/x-www-form-urlencoded' 
  //      }
  //    })
  //    //return access token
  //    return response.data.access_token;
  //    //console.log(response.data.access_token);   
  //  }catch(error){
  //    //on fail, log the error in console
  //    console.log(error);
  //  }
  //}

  async postToken(): Promise<any> {

    try{
      //make post request to SPOTIFY API for access token, sending relavent info
      const token_url = 'https://accounts.spotify.com/api/token';
      const auth_token = Buffer.from(`${this.clientID}:${this.clientSECRET}`, 'utf-8').toString('base64');
      //const data = qs.stringify({'grant_type':'client_credentials'});
  
      const response = await axios.post(token_url, {'grant_type':'client_credentials'}, {
        headers: {
          'Authorization': `Basic ${auth_token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      //return access token
      console.log(response.data.access_token);
      return response.data.access_token;
    }catch(error){
      //on fail, log the error in console
      console.log(error);
    }


    //console.log(Buffer.from((this.clientID + ':' + this.clientSECRET), 'utf8').toString('base64'));
    //const url = `https://accounts.spotify.com/api/token`;
    ////const data = qs.stringify({'grant_type':'client_credentials'});
//
    //return await axios.post(url, {'grant_type':'client_credentials'}, {
    //        headers: {
    //          'Authorization': `Basic ${this.clientSECRET}`,
    //          'Content-Type': 'application/x-www-form-urlencoded'
    //        }
    //      }).then((response: any) => {
    //  return response.data;
    //});
  }

}
