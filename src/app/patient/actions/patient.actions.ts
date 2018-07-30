import { Action } from '@ngrx/store';
import { Patient } from '../models/patient';

export enum PatientActionTypes {
  PATIENT_ADD = 'PATIENT_ADD',
  PATIENT_ADD_COMPLETE = 'PATIENT_ADD_COMPLETE'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class PATIENT_ADD implements Action {
  readonly type = PatientActionTypes.PATIENT_ADD;

  constructor(public payload: Patient) {}
}

export class PATIENT_ADD_COMPLETE implements Action {
  readonly type = PatientActionTypes.PATIENT_ADD_COMPLETE;

  constructor(public payload: Patient) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PatientActionsUnion =
  | PATIENT_ADD
  | PATIENT_ADD_COMPLETE
;