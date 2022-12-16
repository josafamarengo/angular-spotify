import {Component, OnDestroy, OnInit} from '@angular/core';
import {ITrack} from "../../interfaces/ITrack";
import {newTrack} from "../../shared/factories";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit, OnDestroy {

  bannerImg = '';
  bannerText = '';

  tracks: ITrack[] = [];
  currentTrack: ITrack = newTrack();

  subs: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.getTracks();
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

  async getData(type: string, id: string) {
    if(type === 'playlist') {
      await this.getPlaylistData(id);
    }
    if(type === 'artist') {
      await this.getArtistData(id);
    }
  }

  async getPlaylistData(id: string) {
    const playlist = await this.spotifyService.getPlaylistTracks(id);
    if ("tracks" in playlist) {
      this.defineData(playlist.image, playlist.name, playlist.tracks);
    }
  }

  async getArtistData(id: string) {

  }

  defineData(bannerImg: string, bannerText: string, tracks: ITrack[]) {
    this.bannerImg = bannerImg;
    this.bannerText = bannerText;
    this.tracks = tracks;
  }
}
