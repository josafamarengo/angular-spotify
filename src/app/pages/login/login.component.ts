import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.verify()
  }

  verify() {
    const token = this.spotifyService.getAccessToken();
  }

  login() {
    window.location.href = this.spotifyService.getLoginUrl();
  }

}
