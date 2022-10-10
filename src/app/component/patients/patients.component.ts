import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import axios from "axios";

import clientsData from "../../../../db.json";

interface Client {
  id: number;
  name: string;
  age: number;
  dob: string;
  phoneNumber: number;
  location: string;
  gender: string;
  email: string;
  consulting: object;
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
    private router: Router,
    private http: HttpClient
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
    axios.post("http://localhost:3000/clients", payload).then((res: any) => {
      this.clients.push(res.data);
    });
  }

  resetDetails() {
    this.clientForm.reset();
  }

  openDetails(id: any) {
    const client: any = this.clients.find((c) => c.id == id);
    const queryParams: any = {};
    queryParams.myArray = JSON.stringify(client);
    const params = {
      queryParams
    };
    this.router.navigate([`/clients/${id}`], params);
  }
}
