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

import { DoctorService } from '../services/doctor.service';
import {
  DoctorActionTypes,
  DoctorCreate,
  DoctorCreateComplete,
  DoctorsGet,
  DoctorsGetComplete,
  DoctorSave,
  DoctorSaveComplete,
  DoctorGet,
  DoctorGetComplete
} from '../actions/doctor.actions';

import { Doctor } from '../models/doctor';
import { PageResponse} from '../../shared/pagination/models/pagination'

//may need this when working on doctor filtering
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
export class DoctorEffects {
    
  @Effect()
  createDoctor$: Observable<Action> = this.actions$.pipe(
    ofType<DoctorCreate>(DoctorActionTypes.DOCTOR_CREATE),
    map(action => action.payload),
    switchMap(doctor => {
      return this.doctorService.createDoctor(doctor).pipe(
        map((createdDoctor: Doctor) => new DoctorCreateComplete(createdDoctor)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  saveDoctor$: Observable<Action> = this.actions$.pipe(
    ofType<DoctorSave>(DoctorActionTypes.DOCTOR_SAVE),
    map(action => action.payload),
    switchMap(doctor => {
      return this.doctorService.saveDoctor(doctor).pipe(
        map((savedDoctor: Doctor) => new DoctorSaveComplete(savedDoctor.id, savedDoctor)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getDoctors$: Observable<Action> = this.actions$.pipe(
    ofType<DoctorsGet>(DoctorActionTypes.DOCTORS_GET),
    switchMap(action => {
    return this.doctorService.getDoctors(action.filter, action.pageRequest).pipe(  
        map((returnedDoctors: PageResponse<Doctor>) => new DoctorsGetComplete(returnedDoctors)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getDoctor$: Observable<Action> = this.actions$.pipe(
    ofType<DoctorGet>(DoctorActionTypes.DOCTOR_GET),
    switchMap(action => {
      return this.doctorService.getDoctor(action.payload).pipe(
        map((returnedDoctor: Doctor) => new DoctorGetComplete(returnedDoctor)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private doctorService: DoctorService,
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
