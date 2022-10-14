import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges }  from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() visibleSidebar: boolean = true;
  @Output() showSidebar = new EventEmitter();
  showSearchBar: boolean = false;
  searchedText: string = "";
  @Output() changeText = new EventEmitter();

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    if(this.router.url.includes('clients') || this.router.url.includes('consulting')) {
      this.showSearchBar = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeText.emit(this.searchedText);
  }

  onChangeText(event: any) {
    this.searchedText = event.target.value;
    this.changeText.emit(this.searchedText);
  }

  onShowSidebarClick() {
    this.showSidebar.emit();
  }
}
