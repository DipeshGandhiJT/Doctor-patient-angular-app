import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from "rxjs/operators";



export interface PatientState {
    name : string | undefined;
}
@State<PatientState>({
    name: "patients",
    defaults: {
        name: undefined,

    },
})
@Injectable()
export class PatientsState {

    constructor(
        private http: HttpClient
    ) { }

    
    

}
