import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  selected = 'home';
  @Input()
  homeLabel = 'Home';
  @Input()
  searchLabel = 'Pesquisar';
  @Input()
  libraryLabel = 'Sua Biblioteca';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClick(selected: string) {
    this.selected = selected;
    this.router.navigate([`/player/${selected}`]);
  }

}
