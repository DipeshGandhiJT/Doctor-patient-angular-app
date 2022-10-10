import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { PatientsModel } from "./patients.model";
import { PatientsAction } from "./patients.action";

export interface PatientStateModel {
  loader: boolean | undefined;
  patients: PatientsModel[] | undefined;
}

@State<PatientStateModel>({
  name: "patientsState",
  defaults: {
    loader: undefined,
    patients: undefined,
  },
})
@Injectable()
export class PatientsState {
  constructor(private http: HttpClient) {}

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
    // return this.http.get(environment.baseUrl + "/patients").pipe(
    //   tap((res: any) => {
    //     const { data } = res;
    //     if (data) {
    //       patchState({ ...state, loader: false, patients: data });
    //     } else {
    //       patchState({ ...state, loader: false, patients: [] });
    //     }
    //   })
    // );
  }
}
