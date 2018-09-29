import { Action } from '@ngrx/store';
import { Attorney } from '../models/attorney';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

export enum AttorneyActionTypes {
  ATTORNEY_CREATE = 'ATTORNEY_CREATE',
  ATTORNEY_CREATE_COMPLETE = 'ATTORNEY_CREATE_COMPLETE',
  ATTORNEY_SAVE = 'ATTORNEY_SAVE',
  ATTORNEY_SAVE_COMPLETE = 'ATTORNEY_SAVE_COMPLETE',
  ATTORNEYS_GET = 'ATTORNEYS_GET',
  ATTORNEYS_GET_COMPLETE = 'ATTORNEYS_GET_COMPLETE',
  ATTORNEY_GET = 'ATTORNEY_GET',
  ATTORNEY_GET_COMPLETE = 'ATTORNEY_GET_COMPLETE'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class AttorneyCreate implements Action {
  readonly type = AttorneyActionTypes.ATTORNEY_CREATE;

  constructor(public payload: Attorney) {}
}

export class AttorneyCreateComplete implements Action {
  readonly type = AttorneyActionTypes.ATTORNEY_CREATE_COMPLETE;

  constructor(public payload: Attorney) {}
}

export class AttorneysGet implements Action {
  readonly type = AttorneyActionTypes.ATTORNEYS_GET;

  constructor(public filter: object, public pageRequest: PageRequest) {}
}

export class AttorneysGetComplete implements Action {
  readonly type = AttorneyActionTypes.ATTORNEYS_GET_COMPLETE;

  constructor(public payload: PageResponse<Attorney>) {}
}

export class AttorneySave implements Action {
  readonly type = AttorneyActionTypes.ATTORNEY_SAVE;

  constructor(public payload: Attorney) {}
}

export class AttorneySaveComplete implements Action {
  readonly type = AttorneyActionTypes.ATTORNEY_SAVE_COMPLETE;

  constructor(public id: number, public changes: Partial<Attorney>) {}
}

export class AttorneyGet implements Action {
  readonly type = AttorneyActionTypes.ATTORNEY_GET;

  constructor(public payload: number) {}
}

export class AttorneyGetComplete implements Action {
  readonly type = AttorneyActionTypes.ATTORNEY_GET_COMPLETE;

  constructor(public payload: Attorney) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AttorneyActionsUnion =
  | AttorneyCreate
  | AttorneyCreateComplete
  | AttorneysGet
  | AttorneysGetComplete
  | AttorneySave
  | AttorneySaveComplete
  | AttorneyGet
  | AttorneyGetComplete
;