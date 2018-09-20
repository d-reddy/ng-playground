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

import { InsuranceProviderService } from '../services/insurance-provider.service';
import {
  InsuranceProviderActionTypes,
  InsuranceProviderCreate,
  InsuranceProviderCreateComplete,
  InsuranceProvidersGet,
  InsuranceProvidersGetComplete,
  InsuranceProviderSave,
  InsuranceProviderSaveComplete,
  InsuranceProviderGet,
  InsuranceProviderGetComplete
} from '../actions/insurance-provider.actions';

import { InsuranceProvider } from '../models/insuranceProvider';
import { PageResponse} from '../../shared/pagination/models/pagination'

//may need this when working on insuranceProvider filtering
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
export class InsuranceProviderEffects {
    
  @Effect()
  createInsuranceProvider$: Observable<Action> = this.actions$.pipe(
    ofType<InsuranceProviderCreate>(InsuranceProviderActionTypes.INSURANCE_PROVIDER_CREATE),
    map(action => action.payload),
    switchMap(insuranceProvider => {
      return this.insuranceProviderService.createInsuranceProvider(insuranceProvider).pipe(
        map((createdInsuranceProvider: InsuranceProvider) => new InsuranceProviderCreateComplete(createdInsuranceProvider)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  saveInsuranceProvider$: Observable<Action> = this.actions$.pipe(
    ofType<InsuranceProviderSave>(InsuranceProviderActionTypes.INSURANCE_PROVIDER_SAVE),
    map(action => action.payload),
    switchMap(insuranceProvider => {
      return this.insuranceProviderService.saveInsuranceProvider(insuranceProvider).pipe(
        map((savedInsuranceProvider: InsuranceProvider) => new InsuranceProviderSaveComplete(savedInsuranceProvider.id, savedInsuranceProvider)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getInsuranceProviders$: Observable<Action> = this.actions$.pipe(
    ofType<InsuranceProvidersGet>(InsuranceProviderActionTypes.INSURANCE_PROVIDERS_GET),
    switchMap(action => {
//      return this.insuranceProviderService.getInsuranceProviders().pipe(
    return this.insuranceProviderService.getInsuranceProviders(action.filter, action.pageRequest).pipe(  
//        map((returnedInsuranceProviders: InsuranceProvider[]) => new InsuranceProvidersGetComplete(returnedInsuranceProviders)),
        map((returnedInsuranceProviders: PageResponse<InsuranceProvider>) => new InsuranceProvidersGetComplete(returnedInsuranceProviders)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getInsuranceProvider$: Observable<Action> = this.actions$.pipe(
    ofType<InsuranceProviderGet>(InsuranceProviderActionTypes.INSURANCE_PROVIDER_GET),
    switchMap(action => {
      return this.insuranceProviderService.getInsuranceProvider(action.payload).pipe(
        map((returnedInsuranceProvider: InsuranceProvider) => new InsuranceProviderGetComplete(returnedInsuranceProvider)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private insuranceProviderService: InsuranceProviderService,
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
