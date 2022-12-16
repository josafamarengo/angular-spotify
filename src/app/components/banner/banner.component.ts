import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input()
  bannerTitle = 'Spotify';
  @Input()
  bannerImg = '';
  subtitle= '';
  @Input()
  numberOfItems = 0;
  @Input()
  totalTime = '';

  constructor() { }

  ngOnInit() {
    this.playlistOrArtist();
  }

  playlistOrArtist(){
    const url = window.location.href;
    if (url.includes('playlist')) {
      this.subtitle = 'Playlist';
    }
    if (url.includes('artist')) {
      this.subtitle = 'Artista';
    }
  }

}
