import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent {
  @Input()
  label = '';

  @Input()
  selected = false;

  @Output()
  selectedChange = new EventEmitter<boolean>();

  constructor() {}

  onClick() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

}
