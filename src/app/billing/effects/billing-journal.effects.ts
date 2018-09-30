import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  map,
  switchMap,
} from 'rxjs/operators';

import { BillingJournalService } from '../services/billing-journal.service';
import {
  BillingJournalActionTypes,
  BillingJournalCreate,
  BillingJournalCreateComplete,
  BillingJournalSave,
  BillingJournalSaveComplete,
  BillingJournalGet,
  BillingJournalGetComplete
} from '../actions/billing-journal.actions';

import { BillingJournal } from '../models/billingJournal';

@Injectable()
export class BillingJournalEffects {
    
  @Effect()
  createBillingJournal$: Observable<Action> = this.actions$.pipe(
    ofType<BillingJournalCreate>(BillingJournalActionTypes.BILLING_JOURNAL_CREATE),
    map(action => action.payload),
    switchMap(billingJournal => {
      return this.billingJournalService.createBillingJournal(billingJournal).pipe(
        map((createdBillingJournal: BillingJournal) => new BillingJournalCreateComplete(createdBillingJournal)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  saveBillingJournal$: Observable<Action> = this.actions$.pipe(
    ofType<BillingJournalSave>(BillingJournalActionTypes.BILLING_JOURNAL_SAVE),
    map(action => action.payload),
    switchMap(billingJournal => {
      return this.billingJournalService.saveBillingJournal(billingJournal).pipe(
        map((savedBillingJournal: BillingJournal) => new BillingJournalSaveComplete(savedBillingJournal.id, savedBillingJournal)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getBillingJournal$: Observable<Action> = this.actions$.pipe(
    ofType<BillingJournalGet>(BillingJournalActionTypes.BILLING_JOURNAL_GET),
    switchMap(action => {
      return this.billingJournalService.getBillingJournal(action.payload).pipe(
        map((returnedBillingJournal: BillingJournal) => new BillingJournalGetComplete(returnedBillingJournal)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private billingJournalService: BillingJournalService
  ) {}
}
