import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {ITrack} from "../../interfaces/ITrack";
import {PlayerService} from "../../services/player.service";
import {newTrack} from "../../shared/factories";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  screenWidth = window.innerWidth;
  tracks: ITrack[] = [];
  currentTrack: ITrack = newTrack();
  subs: Subscription[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.getWindowWidth();
    this.getTracks();
    this.getPlayingTrack();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getWindowWidth() {
    const width = window.innerWidth;
    this.screenWidth = width;
  }

  async getTracks() {
    const tracks = await this.spotifyService.getTracks();
    if(!!tracks) {
      this.tracks = tracks;
    }
  }

  getArtists(track: ITrack) {
    return track.artists.map(artist => artist.name).join(', ');
  }

  async playTrack(track: ITrack) {
    await this.spotifyService.playTrack(track);
    this.playerService.definePlayingTrack(track);
  }

  getPlayingTrack() {
    const sub = this.playerService.playingSong.subscribe(track => {
      this.currentTrack = track;
    });
    this.subs.push(sub);
  }
}
