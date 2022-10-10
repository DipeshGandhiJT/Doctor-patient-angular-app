import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';

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

  constructor(
    public translate: TranslateService,
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const myArray = this.activatedRoute.snapshot.queryParamMap.get('myArray');
    if (myArray === null) {
      this.client = new Array<string>();
    } else {
      this.client = JSON.parse(myArray);
    }
    this.consultingForm = this.formBuilder.group({
      date: ["", Validators.required],
      illness: ["", Validators.required],
      prescription: ["", Validators.required],
      description:  ["", Validators.required],
    });
  }

  openDetails(item: any) {
    const queryParams: any = {};
    queryParams.myArray = JSON.stringify(item);
    this.router.navigate([`clients/consulting/${this.client.id}`], { queryParams });
  }

  open(item: any) {
    this.modalService.open(item, { ariaLabelledBy: "modal-basic-title" });
  }

  submitDetails() {
    let payload: any = this.consultingForm.value || {};
    const consult = [ ...this.client.consulting, payload];
    const client = { ...this.client, consulting: consult };
    axios.patch(`http://localhost:3000/clients/${client.id}`, client).then((res: any) => {
      this.client = res.data;
      this.client.consulting = res.data.client.consulting
    });
  }

  resetDetails() {
    this.consultingForm.reset();
  }

}
