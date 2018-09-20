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
  BillingActionTypes,
  BillingCreate,
  BillingCreateComplete,
  BillingsGet,
  BillingsGetComplete,
  BillingSave,
  BillingSaveComplete,
  BillingGet,
  BillingGetComplete
} from '../actions/billing.actions';

import { Billing } from '../models/billing';
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
export class BillingEffects {
    
  @Effect()
  createBilling$: Observable<Action> = this.actions$.pipe(
    ofType<BillingCreate>(BillingActionTypes.BILLING_CREATE),
    map(action => action.payload),
    switchMap(billing => {
      return this.billingService.createBilling(billing).pipe(
        map((createdBilling: Billing) => new BillingCreateComplete(createdBilling)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  saveBilling$: Observable<Action> = this.actions$.pipe(
    ofType<BillingSave>(BillingActionTypes.BILLING_SAVE),
    map(action => action.payload),
    switchMap(billing => {
      return this.billingService.saveBilling(billing).pipe(
        map((savedBilling: Billing) => new BillingSaveComplete(savedBilling.id, savedBilling)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getBillings$: Observable<Action> = this.actions$.pipe(
    ofType<BillingsGet>(BillingActionTypes.BILLINGS_GET),
    switchMap(action => {
//      return this.billingService.getBillings().pipe(
    return this.billingService.getBillings(action.filter, action.pageRequest).pipe(  
//        map((returnedBillings: Billing[]) => new BillingsGetComplete(returnedBillings)),
        map((returnedBillings: PageResponse<Billing>) => new BillingsGetComplete(returnedBillings)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getBilling$: Observable<Action> = this.actions$.pipe(
    ofType<BillingGet>(BillingActionTypes.BILLING_GET),
    switchMap(action => {
      return this.billingService.getBilling(action.payload).pipe(
        map((returnedBilling: Billing) => new BillingGetComplete(returnedBilling)),
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
