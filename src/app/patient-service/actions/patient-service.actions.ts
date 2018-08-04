import { Action } from '@ngrx/store';
import { PatientService } from '../models/patientService';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

export enum PatientServiceActionTypes {
  PATIENTSERVICE_CREATE = 'PATIENTSERVICE_CREATE',
  PATIENTSERVICE_CREATE_COMPLETE = 'PATIENTSERVICE_CREATE_COMPLETE',
  PATIENTSERVICE_SAVE = 'PATIENTSERVICE_SAVE',
  PATIENTSERVICE_SAVE_COMPLETE = 'PATIENTSERVICE_SAVE_COMPLETE',
  PATIENTSERVICES_GET = 'PATIENTSERVICES_GET',
  PATIENTSERVICES_GET_COMPLETE = 'PATIENTSERVICES_GET_COMPLETE',
  PATIENTSERVICE_GET = 'PATIENTSERVICE_GET',
  PATIENTSERVICE_GET_COMPLETE = 'PATIENTSERVICE_GET_COMPLETE',
  PATIENTSERVICE_EXAMS_GET = 'PATIENTSERVICE_EXAMS_GET',
  PATIENTSERVICE_EXAMS_GET_COMPLETE = 'PATIENTSERVICE_EXAMS_GET_COMPLETE'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class PatientServiceCreate implements Action {
  readonly type = PatientServiceActionTypes.PATIENTSERVICE_CREATE;

  constructor(public payload: PatientService) {}
}

export class PatientServiceCreateComplete implements Action {
  readonly type = PatientServiceActionTypes.PATIENTSERVICE_CREATE_COMPLETE;

  constructor(public payload: PatientService) {}
}

export class PatientServicesGet implements Action {
  readonly type = PatientServiceActionTypes.PATIENTSERVICES_GET;

//  constructor() {}
  constructor(public filter: object, public pageRequest: PageRequest) {}
}

export class PatientServicesGetComplete implements Action {
  readonly type = PatientServiceActionTypes.PATIENTSERVICES_GET_COMPLETE;

  constructor(public payload: PageResponse<PatientService>) {}
}

export class PatientServiceSave implements Action {
  readonly type = PatientServiceActionTypes.PATIENTSERVICE_SAVE;

  constructor(public payload: PatientService) {}
}

export class PatientServiceSaveComplete implements Action {
  readonly type = PatientServiceActionTypes.PATIENTSERVICE_SAVE_COMPLETE;

  constructor(public id: number, public changes: Partial<PatientService>) {}
}

export class PatientServiceGet implements Action {
  readonly type = PatientServiceActionTypes.PATIENTSERVICE_GET;

  constructor(public payload: number) {}
}

export class PatientServiceGetComplete implements Action {
  readonly type = PatientServiceActionTypes.PATIENTSERVICE_GET_COMPLETE;

  constructor(public payload: PatientService) {}
}


export class PatientServiceExamsGet implements Action {
  readonly type = PatientServiceActionTypes.PATIENTSERVICE_EXAMS_GET;

  constructor(public payload: number) {}
}

export class PatientServiceExamsGetComplete implements Action {
  readonly type = PatientServiceActionTypes.PATIENTSERVICE_EXAMS_GET_COMPLETE;

  constructor(public payload: PatientService) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PatientServiceActionsUnion =
  | PatientServiceCreate
  | PatientServiceCreateComplete
  | PatientServicesGet
  | PatientServicesGetComplete
  | PatientServiceSave
  | PatientServiceSaveComplete
  | PatientServiceGet
  | PatientServiceGetComplete
  | PatientServiceExamsGet
  | PatientServiceExamsGetComplete
;