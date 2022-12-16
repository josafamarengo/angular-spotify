import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ITrack} from "../interfaces/ITrack";
import {newTrack} from "../shared/factories";
import {SpotifyService} from "./spotify.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playingSong = new BehaviorSubject<ITrack>(newTrack());

  timerId: any = null;

  constructor(
    private spotifyService: SpotifyService,
  ) {
    this.getPlayingTrack();
  }

  async getPlayingTrack() {
    clearTimeout(this.timerId);
    const track = await this.spotifyService.getPlayingTrack();
    this.definePlayingTrack(track);
    this.timerId = setInterval(async() => await this.getPlayingTrack(), 1000);
  }

  definePlayingTrack(track: ITrack) {
    this.playingSong.next(track);
  }

  async back() {
    await this.spotifyService.back();
    await this.getPlayingTrack();
  }

  async next() {
    await this.spotifyService.next();
    await this.getPlayingTrack();
  }
}
