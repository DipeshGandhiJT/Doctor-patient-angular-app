import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    public translate: TranslateService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openDetails(id: any) {
    this.router.navigateByUrl(`/consulting/${id}`);
  }

  open(item: any) {
    this.modalService.open(item, { ariaLabelledBy: "modal-basic-title" });
  }
}
