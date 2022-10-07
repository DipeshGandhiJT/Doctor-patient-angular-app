import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() visibleSidebar: boolean = true;
  @Output() showSidebar = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onShowSidebarClick() {
    this.showSidebar.emit();
  }
}
