import { Injectable } from '@angular/core';
import { SpotifyConfig} from "../../environments/environment";
import Spotify from 'spotify-web-api-js';
import {IUser} from "../interfaces/IUser";
import {Router} from "@angular/router";
import {SpotifyUserToUser} from "../shared/SpotifyHelper";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async startUser() {
    if(!!this.user)
      return true;

    const token = localStorage.getItem('token');

    if(!token)
      return false;

    try {

      this.defineToken(token);
      await this.getUser();
      return !!this.user;

    }catch(ex){
      return false;
    }
  }

  async getUser() {
    const userInformation = await this.spotifyApi.getMe();
    this.user = SpotifyUserToUser(userInformation);
  }


  getLoginUrl() {
    const authEndpoint = `${SpotifyConfig.authEndPoint}?client_id=${SpotifyConfig.clientId}&redirect_uri=${SpotifyConfig.redirectUrl}&scope=${SpotifyConfig.scopes.join("%20")}&response_type=token&show_dialog=true`;
    return authEndpoint;
  }

  getAccessToken() {
    if (!window.location.hash) {
      return ''
    }

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  defineToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    if (token) {
      localStorage.setItem('token', token);
    }
  }
}
