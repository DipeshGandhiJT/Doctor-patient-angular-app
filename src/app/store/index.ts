import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";

import { PatientsState } from "./patients";

const state = [
    PatientsState,
];
@NgModule({
    imports:[
        NgxsModule.forRoot(state),
    ]
})
export class StoreModule{

}
