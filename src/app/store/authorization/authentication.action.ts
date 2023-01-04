import { AutneticationModel  } from 'app/store/authorization';

export namespace AutenticationAction {

  export class Login {
    static readonly type = "[Autentication] Login";
    constructor(public payload: AutneticationModel) {}
  }

}
