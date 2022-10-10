import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';

@Component({
  selector: 'app-consulting',
  templateUrl: './consulting.component.html',
  styleUrls: ['./consulting.component.scss']
})
export class ConsultingComponent implements OnInit {

  searchedText: string = "";
  consultings: any = [];
  consultingForm: FormGroup | any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.consultingForm = this.formBuilder.group({
      date: ["", Validators.required],
      illness: ["", Validators.required],
      prescription: ["", Validators.required],
    });
  }

  open(item: any) {
    this.modalService.open(item, { ariaLabelledBy: "modal-basic-title" });
  }

  get consultingFormControl() {
    return this.consultingForm.controls;
  }

  submitDetails() {
    let payload: any = this.consultingForm.value || {};
    axios.post("http://localhost:3000/consulting", payload).then((res: any) => {
      console.log("consulting-res-------", res);
    });
  }

  resetDetails() {
    this.consultingForm.reset();
  }

  openDetails(id: any) {
    const consulting = this.consultings.find((c: any) => c.id == id);
    this.router.navigate([`/consulting/${id}`], { queryParams: consulting });
  }

}
