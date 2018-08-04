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

import { PatientServiceService } from '../services/patient-service.service';
import {
  PatientServiceActionTypes,
  PatientServiceCreate,
  PatientServiceCreateComplete,
  PatientServicesGet,
  PatientServicesGetComplete,
  PatientServiceSave,
  PatientServiceSaveComplete,
  PatientServiceGet,
  PatientServiceGetComplete,
  PatientServiceExamsGet,
  PatientServiceExamsGetComplete
} from '../actions/patient-service.actions';

import { PatientService } from '../models/patientService';
import { PageResponse} from '../../shared/pagination/models/pagination'

//may need this when working on patientService filtering
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
export class PatientServiceEffects {
    
  @Effect()
  createPatientService$: Observable<Action> = this.actions$.pipe(
    ofType<PatientServiceCreate>(PatientServiceActionTypes.PATIENTSERVICE_CREATE),
    map(action => action.payload),
    switchMap(patientService => {
      return this.patientServiceService.createPatientService(patientService).pipe(
        map((createdPatientService: PatientService) => new PatientServiceCreateComplete(createdPatientService)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  savePatientService$: Observable<Action> = this.actions$.pipe(
    ofType<PatientServiceSave>(PatientServiceActionTypes.PATIENTSERVICE_SAVE),
    map(action => action.payload),
    switchMap(patientService => {
      return this.patientServiceService.savePatientService(patientService).pipe(
        map((savedPatientService: PatientService) => new PatientServiceSaveComplete(savedPatientService.id, savedPatientService)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getPatientServices$: Observable<Action> = this.actions$.pipe(
    ofType<PatientServicesGet>(PatientServiceActionTypes.PATIENTSERVICES_GET),
    switchMap(action => {
    return this.patientServiceService.getPatientServices(action.filter, action.pageRequest).pipe(  
        map((returnedPatientServices: PageResponse<PatientService>) => new PatientServicesGetComplete(returnedPatientServices)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getPatientService$: Observable<Action> = this.actions$.pipe(
    ofType<PatientServiceGet>(PatientServiceActionTypes.PATIENTSERVICE_GET),
    switchMap(action => {
      return this.patientServiceService.getPatientService(action.payload).pipe(
        map((returnedPatientService: PatientService) => new PatientServiceGetComplete(returnedPatientService)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private patientServiceService: PatientServiceService,
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
