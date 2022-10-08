import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
    type: 'patients'
})
export class PatientsModel extends JsonApiModel {

    @Attribute() _id: string | undefined;
    @Attribute() isActive : boolean | undefined;
     
}