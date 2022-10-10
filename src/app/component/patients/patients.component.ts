import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import clientsData from "../../../../db.json";

interface Client {
  id: number;
  name: string;
  age: number;
  dob: string;
  phoneNumber: number;
  location: string;
  visits: object;
}

@Component({
  selector: "app-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
})
export class PatientsComponent implements OnInit {
  searchedText: string = "";
  // clients: Client[] = clientsData.clients;
  clients = clientsData.clients;
  clientForm: FormGroup | any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name: ["", Validators.required],
      dob: ["", Validators.required],
      location: ["", Validators.required],
      gender: ["", Validators.required],
      email: [""],
      phoneNumber: ["", Validators.required],
    });
  }

  open(item: any) {
    this.modalService.open(item, { ariaLabelledBy: "modal-basic-title" });
  }

  get clientFormControl() {
    return this.clientForm.controls;
  }

  submitDetails() {
    const payload = this.clientForm.value;
    var diff_ms = Date.now() - new Date(payload.dob).getTime();
    var age_dt = new Date(diff_ms);
    const age = Math.abs(age_dt.getUTCFullYear() - 1970);
    payload.age = age;
    this.clients.push(payload);
  }

  resetDetails() {
    this.clientForm.reset();
  }

  openDetails(id: any) {
    const client = this.clients.find((c) => c.id == id);
    this.router.navigate([`/clients/${id}`], { queryParams: client });
  }
}
