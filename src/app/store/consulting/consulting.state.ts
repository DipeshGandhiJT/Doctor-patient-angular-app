import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { ConsultingModel } from "./consulting.model";
import { ConsultingAction } from "./consulting.action";

export interface ConsultingStateModel {
  loader: boolean | undefined;
  consultings: ConsultingModel[] | undefined;
}

@State<ConsultingStateModel>({
  name: "consultingState",
  defaults: {
    loader: undefined,
    consultings: undefined,
  },
})
@Injectable()
export class ConsultingState {
  constructor(private http: HttpClient) {}

  @Selector()
  static getConsulting(state: ConsultingModel) {
    return state["consulting"];
  }

  @Action(ConsultingAction.getAllConsulting)
  getAllConsulting({
    getState,
    setState,
    patchState,
  }: StateContext<ConsultingStateModel>) {
    const state = getState();
    patchState({ ...state, loader: true });
    // return this.http.get(environment.baseUrl + "/consulting").pipe(
    //   tap((res: any) => {
    //     const { data } = res;
    //     if (data) {
    //       patchState({ ...state, loader: false, consultings: data });
    //     } else {
    //       patchState({ ...state, loader: false, consultings: [] });
    //     }
    //   })
    // );
  }
}
