import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verify()
  }

  verify() {
    const token = this.spotifyService.getAccessToken();
    if(!!token) {
      this.spotifyService.defineToken(token);
      this.router.navigate(['/player/home']);
    }
  }

  login() {
    window.location.href = this.spotifyService.getLoginUrl();
  }

}
