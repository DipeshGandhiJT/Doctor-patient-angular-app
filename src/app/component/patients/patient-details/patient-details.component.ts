import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {

  searchedText: string = "";
  data: any[] = [];
  consultingForm: FormGroup | any;
  client: any = {};
  // clientId: any;

  constructor(
    public translate: TranslateService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.client = params;
    });
    // this.clientId = this.router.url.split('/')[2];
    // Get id of client and get all visits(consulting) of that client
  }

  openDetails(id: any) {
    this.router.navigateByUrl(`/consulting/${id}`);
  }

  open(item: any) {
    this.modalService.open(item, { ariaLabelledBy: "modal-basic-title" });
  }
}
