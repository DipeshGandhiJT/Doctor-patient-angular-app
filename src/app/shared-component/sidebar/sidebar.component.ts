import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];
  @Input() visibleSidebar: boolean = true;
  constructor() {}

  ngOnInit(): void {
    this.menuItems = [{ index: 0, label: 'DASHBOARD', icon: 'pi pi-th-large' }];
  }
}
