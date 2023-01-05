import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { PatientsState } from "./patients";
import { AutenticationState } from './authorization'

const state = [
    PatientsState,AutenticationState
];
@NgModule({
    imports:[
        NgxsModule.forRoot(state),
        NgxsReduxDevtoolsPluginModule.forRoot()
    ]
})
export class StoreModule{

}
