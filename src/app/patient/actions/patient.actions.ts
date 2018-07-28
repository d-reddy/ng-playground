import { Action } from '@ngrx/store';
import { Patient } from '../models/patient';

export enum PatientActionTypes {
  ADD = 'ADD'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class ADD implements Action {
  readonly type = PatientActionTypes.ADD;

  constructor(public payload: Patient) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PatientActionsUnion =
  | ADD
;
