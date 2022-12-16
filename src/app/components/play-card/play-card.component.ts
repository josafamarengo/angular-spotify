import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {newTrack} from "../../shared/factories";
import {Subscription} from "rxjs";
import {ITrack} from "../../interfaces/ITrack";

@Component({
  selector: 'app-play-card',
  templateUrl: './play-card.component.html',
  styleUrls: ['./play-card.component.scss']
})
export class PlayCardComponent implements OnInit, OnDestroy {

  currentTrack:ITrack = newTrack();
  subs: Subscription[] = [];
  playing:boolean = false;

  constructor(
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.getPlayingTrack();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getPlayingTrack() {
    const sub = this.playerService.playingSong.subscribe(track => {
      this.currentTrack = track;
    });
    this.subs.push(sub);
  }

  back() {
    this.playerService.back();
  }

  next() {
    this.playerService.next();
  }

}
