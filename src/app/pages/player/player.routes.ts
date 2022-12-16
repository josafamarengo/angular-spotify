import {Routes} from "@angular/router";
import {PlayerComponent} from "./player.component";
import {HomeComponent} from "../home/home.component";
import {TrackListComponent} from "../track-list/track-list.component";

export const playerRoutes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'list/:type/:id',
        component: TrackListComponent
      }
    ],
  },
];
