import { Action } from '@ngrx/store';
import { ExamBillingLedger } from '../models/examBillingLedger';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

export enum BillingActionTypes {

  BILLING_CREATE = 'BILLING_CREATE',
  BILLING_CREATE_COMPLETE = 'BILLING_CREATE_COMPLETE',
  BILLING_SAVE = 'BILLING_SAVE',
  BILLING_SAVE_COMPLETE = 'BILLING_SAVE_COMPLETE',
  BILLINGS_GET = 'BILLINGS_GET',
  BILLINGS_GET_COMPLETE = 'BILLINGS_GET_COMPLETE',
  BILLING_GET = 'BILLING_GET',
  BILLING_GET_COMPLETE = 'BILLING_GET_COMPLETE'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class BillingCreate implements Action {
  readonly type = BillingActionTypes.BILLING_CREATE;

  constructor(public payload: ExamBillingLedger) {}
}

export class BillingCreateComplete implements Action {
  readonly type = BillingActionTypes.BILLING_CREATE_COMPLETE;

  constructor(public payload: ExamBillingLedger) {}
}

export class BillingsGet implements Action {
  readonly type = BillingActionTypes.BILLINGS_GET;

//  constructor() {}
  constructor(public filter: object, public pageRequest: PageRequest) {}
}

export class BillingsGetComplete implements Action {
  readonly type = BillingActionTypes.BILLINGS_GET_COMPLETE;

  constructor(public payload: PageResponse<ExamBillingLedger>) {}
}

export class BillingSave implements Action {
  readonly type = BillingActionTypes.BILLING_SAVE;

  constructor(public payload: ExamBillingLedger) {}
}

export class BillingSaveComplete implements Action {
  readonly type = BillingActionTypes.BILLING_SAVE_COMPLETE;

  constructor(public id: number, public changes: Partial<ExamBillingLedger>) {}
}

export class BillingGet implements Action {
  readonly type = BillingActionTypes.BILLING_GET;

  constructor(public payload: number) {}
}

export class BillingGetComplete implements Action {
  readonly type = BillingActionTypes.BILLING_GET_COMPLETE;

  constructor(public payload: ExamBillingLedger) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type BillingActionsUnion =
  | BillingCreate
  | BillingCreateComplete
  | BillingsGet
  | BillingsGetComplete
  | BillingSave
  | BillingSaveComplete
  | BillingGet
  | BillingGetComplete
;