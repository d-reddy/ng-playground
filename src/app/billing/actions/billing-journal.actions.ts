import { Action } from '@ngrx/store';
import { BillingJournal } from '../models/billingJournal';

export enum BillingJournalActionTypes {

  BILLING_JOURNAL_CREATE = 'BILLING_JOURNAL_CREATE',
  BILLING_JOURNAL_CREATE_COMPLETE = 'BILLING_JOURNAL_CREATE_COMPLETE',
  BILLING_JOURNAL_SAVE = 'BILLING_JOURNAL_SAVE',
  BILLING_JOURNAL_SAVE_COMPLETE = 'BILLING_JOURNAL_SAVE_COMPLETE',
  BILLING_JOURNAL_GET = 'BILLING_JOURNAL_GET',
  BILLING_JOURNAL_GET_COMPLETE = 'BILLING_JOURNAL_GET_COMPLETE'
}

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

export type BillingJournalActionsUnion =
  | BillingJournalCreate
  | BillingJournalCreateComplete
  | BillingJournalSave
  | BillingJournalSaveComplete
  | BillingJournalGet
  | BillingJournalGetComplete
;