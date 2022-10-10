import { JsonApiModelConfig, JsonApiModel, Attribute } from "angular2-jsonapi";

@JsonApiModelConfig({
  type: "consulting",
})
export class ConsultingModel extends JsonApiModel {
  @Attribute() _id: string | undefined;
  @Attribute() clientId: string | undefined;
  @Attribute() date: string | undefined;
  @Attribute() illness: string | undefined;
  @Attribute() prescription: string | undefined;
  @Attribute() description: string | undefined;
}
