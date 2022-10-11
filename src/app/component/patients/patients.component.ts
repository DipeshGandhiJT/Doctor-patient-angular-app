import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Select, Store } from "@ngxs/store";

import { PatientsAction } from "../../store/patients/patients.action";
import { PatientsState } from "../../store/patients/patients.state";
import { PatientsModel } from "../../store/patients/patients.model";
import {
  distinctUntilChanged,
  Observable,
  ReplaySubject,
  takeUntil,
} from "rxjs";

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
  clients: Client[] = [];
  clientForm: FormGroup | any;

  @Select(PatientsState.getPatients) getAllClient$:
    | Observable<PatientsModel[]>
    | undefined;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getPatients();
    this.clientForm = this.formBuilder.group({
      name: ["", Validators.required],
      dob: ["", Validators.required],
      location: ["", Validators.required],
      gender: ["", Validators.required],
      email: [""],
      phoneNumber: ["", Validators.required],
    });
  }

  getPatients() {
    this.store.dispatch(PatientsAction.getAllPatients);
    this.getAllClient$
      ?.pipe(takeUntil(this.destroyed$), distinctUntilChanged())
      .subscribe((data: any) => {
        this.clients = data;
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
    this.store.dispatch(new PatientsAction.addPatients(payload));
  }

  resetDetails() {
    this.clientForm.reset();
  }

  openDetails(id: any) {
    const client: any = this.clients.find((c) => c.id == id);
    const queryParams: any = {};
    queryParams.myArray = JSON.stringify(client);
    this.router.navigate([`/clients/${id}`], { queryParams });
  }
}
