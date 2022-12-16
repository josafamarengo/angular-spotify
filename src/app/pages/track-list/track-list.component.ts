import {Component, OnDestroy, OnInit} from '@angular/core';
import {ITrack} from "../../interfaces/ITrack";
import {newTrack} from "../../shared/factories";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {SpotifyService} from "../../services/spotify.service";
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit, OnDestroy {

  bannerImg = '';
  bannerText = '';
  numberOfItems = 0;
  totalTime = '';


  screenWidth = window.innerWidth;

  tracks: ITrack[] = [];
  currentTrack: ITrack = newTrack();

  subs: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.getTracks();
    this.getTotalTime();
    this.getPlayingTrack();
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  getTracks() {
    const sub = this.activatedRoute.paramMap
      .subscribe(async params => {
        const type = params.get('type');
        const id = params.get('id');
        await this.getData(type, id);
    });
    this.subs.push(sub);
  }

  getTotalTime() {
    const sub = this.activatedRoute.paramMap
      .subscribe(async params => {
        const type = params.get('type');
        const id = params.get('id');
        if(type === 'playlist') {
          const playlist = await this.spotifyService.getPlaylistTracks(id);
          if ("tracks" in playlist) {
            this.numberOfItems = playlist.tracks.length;
            this.totalTime = this.formatTime(playlist.tracks.reduce((acc, track) => acc + track.time, 0));
          }
        }
    });
    this.subs.push(sub);
  }

  formatTime(time: number) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return (hours > 0 ? hours + 'h ' : '') + (minutes < 10 ? '0' : '') + minutes + "min" ;
  }

  getArtists(track: ITrack) {
    return track.artists.map(artist => artist.name).join(', ');
  }

  async getData(type: string, id: string) {
    if(type === 'playlist') {
      await this.getPlaylistData(id);
    }
  }

  async getPlaylistData(id: string) {
    const playlist = await this.spotifyService.getPlaylistTracks(id);
    if ("tracks" in playlist) {
      this.defineData(playlist.image, playlist.name, playlist.tracks);
    }
  }

  async playTrack(track: ITrack) {
    await this.spotifyService.playTrack(track);
    this.playerService.definePlayingTrack(track);
  }

  defineData(bannerImg: string, bannerText: string, tracks: ITrack[]) {
    this.bannerImg = bannerImg;
    this.bannerText = bannerText;
    this.tracks = tracks;
  }

  getPlayingTrack() {
    const sub = this.playerService.playingSong.subscribe(track => {
      this.currentTrack = track;
    });
    this.subs.push(sub);
  }
}
