import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  map,
  switchMap,
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

@Injectable()
export class InsuranceProviderEffects {
    
  @Effect()
  createInsuranceProvider$: Observable<Action> = this.actions$.pipe(
    ofType<InsuranceProviderCreate>(InsuranceProviderActionTypes.INSURANCE_PROVIDER_CREATE),
    map(action => action.payload),
    switchMap(insuranceProvider => {
      return this.insuranceProviderService.createInsuranceProvider(insuranceProvider).pipe(
        map((createdInsuranceProvider: InsuranceProvider) => new InsuranceProviderCreateComplete(createdInsuranceProvider)),
        //catchError(err => of(new SearchError(err)))
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
        //catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getInsuranceProviders$: Observable<Action> = this.actions$.pipe(
    ofType<InsuranceProvidersGet>(InsuranceProviderActionTypes.INSURANCE_PROVIDERS_GET),
    switchMap(action => {
    return this.insuranceProviderService.getInsuranceProviders(action.filter, action.pageRequest).pipe(  
        map((returnedInsuranceProviders: PageResponse<InsuranceProvider>) => new InsuranceProvidersGetComplete(returnedInsuranceProviders)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getInsuranceProvider$: Observable<Action> = this.actions$.pipe(
    ofType<InsuranceProviderGet>(InsuranceProviderActionTypes.INSURANCE_PROVIDER_GET),
    switchMap(action => {
      return this.insuranceProviderService.getInsuranceProvider(action.payload).pipe(
        map((returnedInsuranceProvider: InsuranceProvider) => new InsuranceProviderGetComplete(returnedInsuranceProvider)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private insuranceProviderService: InsuranceProviderService
  ) {}
}
