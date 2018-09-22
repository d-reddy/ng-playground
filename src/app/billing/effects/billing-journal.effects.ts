import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { BillingService } from '../services/billing.service';
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

import { PageResponse} from '../../shared/pagination/models/pagination'

//may need this when working on billing filtering
// import { Scheduler } from 'rxjs/internal/Scheduler';

// export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
// export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
//   'Search Scheduler'
// );

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class BillingJournalEffects {
    
  @Effect()
  createBillingJournal$: Observable<Action> = this.actions$.pipe(
    ofType<BillingJournalCreate>(BillingJournalActionTypes.BILLING_JOURNAL_CREATE),
    map(action => action.payload),
    switchMap(billingJournal => {
      return this.billingService.createBillingJournal(billingJournal).pipe(
        map((createdBillingJournal: BillingJournal) => new BillingJournalCreateComplete(createdBillingJournal)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  saveBillingJournal$: Observable<Action> = this.actions$.pipe(
    ofType<BillingJournalSave>(BillingJournalActionTypes.BILLING_JOURNAL_SAVE),
    map(action => action.payload),
    switchMap(billingJournal => {
      return this.billingService.saveBillingJournal(billingJournal).pipe(
        map((savedBillingJournal: BillingJournal) => new BillingJournalSaveComplete(savedBillingJournal.id, savedBillingJournal)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getBilling$: Observable<Action> = this.actions$.pipe(
    ofType<BillingJournalGet>(BillingJournalActionTypes.BILLING_JOURNAL_GET),
    switchMap(action => {
      return this.billingService.getBillingJournal(action.payload).pipe(
        map((returnedBillingJournal: BillingJournal) => new BillingJournalGetComplete(returnedBillingJournal)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private billingService: BillingService,
    //@Optional()
    // @Inject(SEARCH_DEBOUNCE)
    // private debounce: number,
    /**
     * You inject an optional Scheduler that will be undefined
     * in normal application usage, but its injected here so that you can mock out
     * during testing using the RxJS TestScheduler for simulating passages of time.
     */
    //@Optional()
    // @Inject(SEARCH_SCHEDULER)
    // private scheduler: Scheduler
  ) {}
}
