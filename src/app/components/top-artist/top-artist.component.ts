import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {IArtist} from "../../interfaces/IArtist";

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss']
})
export class TopArtistComponent implements OnInit {

  artists: IArtist[] = [];

  constructor(
    private spotifyService: SpotifyService
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

}
