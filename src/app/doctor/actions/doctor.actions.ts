import { Action } from '@ngrx/store';
import { Doctor } from '../models/doctor';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

export enum DoctorActionTypes {
  DOCTOR_CREATE = 'DOCTOR_CREATE',
  DOCTOR_CREATE_COMPLETE = 'DOCTOR_CREATE_COMPLETE',
  DOCTOR_SAVE = 'DOCTOR_SAVE',
  DOCTOR_SAVE_COMPLETE = 'DOCTOR_SAVE_COMPLETE',
  DOCTORS_GET = 'DOCTORS_GET',
  DOCTORS_GET_COMPLETE = 'DOCTORS_GET_COMPLETE',
  DOCTOR_GET = 'DOCTOR_GET',
  DOCTOR_GET_COMPLETE = 'DOCTOR_GET_COMPLETE'

}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class DoctorCreate implements Action {
  readonly type = DoctorActionTypes.DOCTOR_CREATE;

  constructor(public payload: Doctor) {}
}

export class DoctorCreateComplete implements Action {
  readonly type = DoctorActionTypes.DOCTOR_CREATE_COMPLETE;

  constructor(public payload: Doctor) {}
}

export class DoctorsGet implements Action {
  readonly type = DoctorActionTypes.DOCTORS_GET;

//  constructor() {}
  constructor(public filter: object, public pageRequest: PageRequest) {}
}

export class DoctorsGetComplete implements Action {
  readonly type = DoctorActionTypes.DOCTORS_GET_COMPLETE;

  constructor(public payload: PageResponse<Doctor>) {}
}

export class DoctorSave implements Action {
  readonly type = DoctorActionTypes.DOCTOR_SAVE;

  constructor(public payload: Doctor) {}
}

export class DoctorSaveComplete implements Action {
  readonly type = DoctorActionTypes.DOCTOR_SAVE_COMPLETE;

  constructor(public id: number, public changes: Partial<Doctor>) {}
}

export class DoctorGet implements Action {
  readonly type = DoctorActionTypes.DOCTOR_GET;

  constructor(public payload: number) {}
}

export class DoctorGetComplete implements Action {
  readonly type = DoctorActionTypes.DOCTOR_GET_COMPLETE;

  constructor(public payload: Doctor) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type DoctorActionsUnion =
  | DoctorCreate
  | DoctorCreateComplete
  | DoctorsGet
  | DoctorsGetComplete
  | DoctorSave
  | DoctorSaveComplete
  | DoctorGet
  | DoctorGetComplete
;