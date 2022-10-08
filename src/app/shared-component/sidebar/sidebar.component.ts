import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];
  @Input() visibleSidebar: boolean = true;
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    this.menuItems = [
      { index: 0, label: "DASHBOARD", icon: "pi pi-th-large" },
      {
        index: 1,
        label: this.translate.instant("global.clients"),
        icon: "pi pi-users",
      },
      { index: 2, label: "OPD", icon: "pi pi-th-large" },
    ];
  }
}
