import { Action } from '@ngrx/store';
import { Patient } from '../models/patient';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

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

  constructor(public filter: object, public pageRequest: PageRequest) {}
}

export class PatientsGetComplete implements Action {
  readonly type = PatientActionTypes.PATIENTS_GET_COMPLETE;

  constructor(public payload: PageResponse<Patient>) {}
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