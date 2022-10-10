import { JsonApiModelConfig, JsonApiModel, Attribute } from "angular2-jsonapi";

@JsonApiModelConfig({
  type: "patients",
})
export class PatientsModel extends JsonApiModel {
  @Attribute() _id: string | undefined;
  @Attribute() name: string | undefined;
  @Attribute() age: number | undefined;
  @Attribute() phoneNumber: number | undefined;
  @Attribute() location: string | undefined;
  @Attribute() email: boolean | undefined;
}
