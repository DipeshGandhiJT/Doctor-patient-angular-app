import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";

import { PatientsAction, PatientsModel } from 'src/app/store/patients';

export interface PatientStateModel {
  loader: boolean | false;
  patients: PatientsModel[] | undefined;
}

const baseURL = "http://localhost:3000/clients";
@State<PatientStateModel>({
  name: "patientsState",
  defaults: {
    loader: false,
    patients: undefined,
  },
})
@Injectable()
export class PatientsState {
  constructor(private http: HttpClient, private store: Store) {}

  @Selector()
  static getPatients(state: PatientsModel) {
    return state["patients"];
  }

  @Action(PatientsAction.getAllPatients)
  getAllPatients({
    getState,
    setState,
    patchState,
  }: StateContext<PatientStateModel>) {
    const state = getState();
    patchState({ ...state, loader: true });
    return this.http.get(baseURL).pipe(
      tap({
        next: (res: any) => {
        if (res) {
          patchState({ ...state, loader: false, patients: res });
        } else {
          patchState({ ...state, loader: false, patients: [] });
        }
      },
      error: (err: any) => {
        patchState({ ...state, loader: false });
      }
    })
  );
  }

  @Action(PatientsAction.addPatients)
  addPatients(
    { getState, setState, patchState }: StateContext<PatientsModel>,
    { payload }: PatientsAction.addPatients
  ) {
    const state = getState();
    patchState({ ...state, loader: true });
    return this.http.post(baseURL, payload).pipe(
      tap({
        next: (res: any) => {
          if (res) {
            this.store.dispatch(PatientsAction.getAllPatients);
          }
        },
        error: (err: any) => {
          patchState({ ...state, loader: false });
        },
      })
    );
  }

  @Action(PatientsAction.updatePatients)
  updateFacility(
    { getState, setState, patchState }: StateContext<PatientsModel>,
    { payload, id }: PatientsAction.updatePatients
  ) {
    const state = getState();
    return this.http.patch(baseURL + `/${id}`, payload).pipe(
      tap({
        next: (res: any) => {
          if (res) {
            this.store.dispatch(PatientsAction.getAllPatients);
          }
        },
        error: (err: any) => {
          patchState({ ...state, loader: false });
        },
      })
    );
  }
}
