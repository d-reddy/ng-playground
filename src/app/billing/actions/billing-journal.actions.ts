import { Action } from '@ngrx/store';
import { BillingJournal } from '../models/billingJournal';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

export enum BillingJournalActionTypes {

  BILLING_JOURNAL_CREATE = 'BILLING_JOURNAL_CREATE',
  BILLING_JOURNAL_CREATE_COMPLETE = 'BILLING_JOURNAL_CREATE_COMPLETE',
  BILLING_JOURNAL_SAVE = 'BILLING_JOURNAL_SAVE',
  BILLING_JOURNAL_SAVE_COMPLETE = 'BILLING_JOURNAL_SAVE_COMPLETE',
  BILLING_JOURNAL_GET = 'BILLING_JOURNAL_GET',
  BILLING_JOURNAL_GET_COMPLETE = 'BILLING_JOURNAL_GET_COMPLETE'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class BillingJournalCreate implements Action {
  readonly type = BillingJournalActionTypes.BILLING_JOURNAL_CREATE;

  constructor(public payload: BillingJournal) {}
}

export class BillingJournalCreateComplete implements Action {
  readonly type = BillingJournalActionTypes.BILLING_JOURNAL_CREATE_COMPLETE;

  constructor(public payload: BillingJournal) {}
}

export class BillingJournalSave implements Action {
  readonly type = BillingJournalActionTypes.BILLING_JOURNAL_SAVE;

  constructor(public payload: BillingJournal) {}
}

export class BillingJournalSaveComplete implements Action {
  readonly type = BillingJournalActionTypes.BILLING_JOURNAL_SAVE_COMPLETE;

  constructor(public id: number, public changes: Partial<BillingJournal>) {}
}

export class BillingJournalGet implements Action {
  readonly type = BillingJournalActionTypes.BILLING_JOURNAL_GET;

  constructor(public payload: number) {}
}

export class BillingJournalGetComplete implements Action {
  readonly type = BillingJournalActionTypes.BILLING_JOURNAL_GET_COMPLETE;

  constructor(public payload: BillingJournal) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type BillingJournalActionsUnion =
  | BillingJournalCreate
  | BillingJournalCreateComplete
  | BillingJournalSave
  | BillingJournalSaveComplete
  | BillingJournalGet
  | BillingJournalGetComplete
;