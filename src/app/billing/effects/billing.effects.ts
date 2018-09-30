import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  map,
  switchMap,
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

import { ExamBillingLedger } from '../models/examBillingLedger';

import { PageResponse} from '../../shared/pagination/models/pagination'

@Injectable()
export class BillingEffects {
    
  @Effect()
  createBilling$: Observable<Action> = this.actions$.pipe(
    ofType<BillingCreate>(BillingActionTypes.BILLING_CREATE),
    map(action => action.payload),
    switchMap(billing => {
      return this.billingService.createBilling(billing).pipe(
        map((createdBilling: ExamBillingLedger) => new BillingCreateComplete(createdBilling)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  saveBilling$: Observable<Action> = this.actions$.pipe(
    ofType<BillingSave>(BillingActionTypes.BILLING_SAVE),
    map(action => action.payload),
    switchMap(billing => {
      return this.billingService.saveBilling(billing).pipe(
        map((savedBilling: ExamBillingLedger) => new BillingSaveComplete(savedBilling.id, savedBilling)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getBillings$: Observable<Action> = this.actions$.pipe(
    ofType<BillingsGet>(BillingActionTypes.BILLINGS_GET),
    switchMap(action => {
    return this.billingService.getBillings(action.filter, action.pageRequest).pipe(  
        map((returnedBillings: PageResponse<ExamBillingLedger>) => new BillingsGetComplete(returnedBillings)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getBilling$: Observable<Action> = this.actions$.pipe(
    ofType<BillingGet>(BillingActionTypes.BILLING_GET),
    switchMap(action => {
      return this.billingService.getBilling(action.payload).pipe(
        map((returnedBilling: ExamBillingLedger) => new BillingGetComplete(returnedBilling)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private billingService: BillingService
  ) {}
}
