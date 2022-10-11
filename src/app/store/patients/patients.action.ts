import { PatientsModel } from './patients.model';

export namespace PatientsAction {
  export class getAllPatients {
    static readonly type = "[Patients] getAllPatients";
  }

  export class addPatients {
    static readonly type = "[Patients] addPatients";
    constructor(public payload: PatientsModel) {}
  }

  export class updatePatients {
    static readonly type = '[Patients] updatePatients';
    constructor(public payload: any, public id: string) {}
}
}
