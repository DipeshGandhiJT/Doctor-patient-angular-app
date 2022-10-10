import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";

import { PatientsState } from "./patients";
import { ConsultingState } from "./consulting";

const state = [
    PatientsState,
    ConsultingState
];
@NgModule({
    imports:[
        NgxsModule.forRoot(state),
    ]
})
export class StoreModule{

}
