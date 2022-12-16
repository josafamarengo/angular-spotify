import {Component, Input, OnInit} from '@angular/core';
import {MatMenuModule, MatMenuPanel} from '@angular/material/menu';

import {IUser} from "../../interfaces/IUser";
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent implements OnInit {

  user: IUser = null;

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.user = this.spotifyService.user;
  }

  logout() {
    this.spotifyService.logout();
  }

}
