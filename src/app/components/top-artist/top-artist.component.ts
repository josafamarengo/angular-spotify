import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {IArtist} from "../../interfaces/IArtist";
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss']
})
export class TopArtistComponent implements OnInit {

  artists: IArtist[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTopArtists();
  }

  async getTopArtists() {
    const artists = await this.spotifyService.getTopArtists();
    if(!!artists) {
      this.artists = artists;
    }
  }

  goToArtist(artistId: string) {
    this.router.navigateByUrl(`/player/list/artist/${artistId}`);
  }

}
