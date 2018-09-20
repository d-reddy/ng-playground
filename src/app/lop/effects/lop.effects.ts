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

import { LopService } from '../services/lop.service';
import {
  LopActionTypes,
  LopCreate,
  LopCreateComplete,
  LopsGet,
  LopsGetComplete,
  LopSave,
  LopSaveComplete,
  LopGet,
  LopGetComplete
} from '../actions/lop.actions';

import { Lop } from '../models/lop';
import { PageResponse} from '../../shared/pagination/models/pagination'

//may need this when working on lop filtering
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
export class LopEffects {
    
  @Effect()
  createLop$: Observable<Action> = this.actions$.pipe(
    ofType<LopCreate>(LopActionTypes.LOP_CREATE),
    map(action => action.payload),
    switchMap(lop => {
      return this.lopService.createLop(lop).pipe(
        map((createdLop: Lop) => new LopCreateComplete(createdLop)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  saveLop$: Observable<Action> = this.actions$.pipe(
    ofType<LopSave>(LopActionTypes.LOP_SAVE),
    map(action => action.payload),
    switchMap(lop => {
      return this.lopService.saveLop(lop).pipe(
        map((savedLop: Lop) => new LopSaveComplete(savedLop.id, savedLop)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getLops$: Observable<Action> = this.actions$.pipe(
    ofType<LopsGet>(LopActionTypes.LOPS_GET),
    switchMap(action => {
//      return this.lopService.getLops().pipe(
    return this.lopService.getLops(action.filter, action.pageRequest).pipe(  
//        map((returnedLops: Lop[]) => new LopsGetComplete(returnedLops)),
        map((returnedLops: PageResponse<Lop>) => new LopsGetComplete(returnedLops)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getLop$: Observable<Action> = this.actions$.pipe(
    ofType<LopGet>(LopActionTypes.LOP_GET),
    switchMap(action => {
      return this.lopService.getLop(action.payload).pipe(
        map((returnedLop: Lop) => new LopGetComplete(returnedLop)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private lopService: LopService,
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
