import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-consulting-details',
  templateUrl: './consulting-details.component.html',
  styleUrls: ['./consulting-details.component.scss']
})
export class ConsultingDetailsComponent implements OnInit {

  searchedText: string = "";
  consulting: any = {};

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.consulting = params;
    });
  }

}
