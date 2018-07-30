import { Action } from '@ngrx/store';
import { Patient } from '../models/patient';

export enum PatientActionTypes {
  PATIENT_CREATE = 'PATIENT_CREATE',
  PATIENT_CREATE_COMPLETE = 'PATIENT_CREATE_COMPLETE',
  PATIENT_SAVE = 'PATIENT_SAVE',
  PATIENT_SAVE_COMPLETE = 'PATIENT_SAVE_COMPLETE',
  PATIENTS_GET = 'PATIENTS_GET',
  PATIENTS_GET_COMPLETE = 'PATIENTS_GET_COMPLETE',
  PATIENT_GET = 'PATIENT_GET',
  PATIENT_GET_COMPLETE = 'PATIENT_GET_COMPLETE'

}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class PatientCreate implements Action {
  readonly type = PatientActionTypes.PATIENT_CREATE;

  constructor(public payload: Patient) {}
}

export class PatientCreateComplete implements Action {
  readonly type = PatientActionTypes.PATIENT_CREATE_COMPLETE;

  constructor(public payload: Patient) {}
}

export class PatientsGet implements Action {
  readonly type = PatientActionTypes.PATIENTS_GET;

  constructor() {}
}

export class PatientsGetComplete implements Action {
  readonly type = PatientActionTypes.PATIENTS_GET_COMPLETE;

  constructor(public payload: Patient[]) {}
}

export class PatientSave implements Action {
  readonly type = PatientActionTypes.PATIENT_SAVE;

  constructor(public payload: Patient) {}
}

export class PatientSaveComplete implements Action {
  readonly type = PatientActionTypes.PATIENT_SAVE_COMPLETE;

  constructor(public id: number, public changes: Partial<Patient>) {}
}

export class PatientGet implements Action {
  readonly type = PatientActionTypes.PATIENT_GET;

  constructor(public payload: number) {}
}

export class PatientGetComplete implements Action {
  readonly type = PatientActionTypes.PATIENT_GET_COMPLETE;

  constructor(public payload: Patient) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PatientActionsUnion =
  | PatientCreate
  | PatientCreateComplete
  | PatientsGet
  | PatientsGetComplete
  | PatientSave
  | PatientSaveComplete
  | PatientGet
  | PatientGetComplete
;