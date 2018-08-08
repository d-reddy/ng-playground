import { Action } from '@ngrx/store';
import { ReferenceData } from '../models/referenceData';

export enum ReferenceDataActionTypes {
  REFERENCE_DATA_GET = 'REFERENCE_DATA_GET',
  REFERENCE_DATA_GET_COMPLETE = 'REFERENCE_DATA_GET_COMPLETE'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class ReferenceDataGet implements Action {
  readonly type = ReferenceDataActionTypes.REFERENCE_DATA_GET;

  constructor() {}
}

export class ReferenceDataGetComplete implements Action {
  readonly type = ReferenceDataActionTypes.REFERENCE_DATA_GET_COMPLETE;

  constructor(public payload: ReferenceData) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ReferenceDataActionsUnion =
  | ReferenceDataGet
  | ReferenceDataGetComplete
;