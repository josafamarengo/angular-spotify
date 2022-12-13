import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import {RouterModule} from "@angular/router";
import {playerRoutes} from "./player.routes";



@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(playerRoutes)
  ]
})
export class PlayerModule { }
