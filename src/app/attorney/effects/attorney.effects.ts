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

import { AttorneyService } from '../services/attorney.service';
import {
  AttorneyActionTypes,
  AttorneyCreate,
  AttorneyCreateComplete,
  AttorneysGet,
  AttorneysGetComplete,
  AttorneySave,
  AttorneySaveComplete,
  AttorneyGet,
  AttorneyGetComplete
} from '../actions/attorney.actions';

import { Attorney } from '../models/attorney';
import { PageResponse} from '../../shared/pagination/models/pagination'

//may need this when working on attorney filtering
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
export class AttorneyEffects {
    
  @Effect()
  createAttorney$: Observable<Action> = this.actions$.pipe(
    ofType<AttorneyCreate>(AttorneyActionTypes.ATTORNEY_CREATE),
    map(action => action.payload),
    switchMap(attorney => {
      return this.attorneyService.createAttorney(attorney).pipe(
        map((createdAttorney: Attorney) => new AttorneyCreateComplete(createdAttorney)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  saveAttorney$: Observable<Action> = this.actions$.pipe(
    ofType<AttorneySave>(AttorneyActionTypes.ATTORNEY_SAVE),
    map(action => action.payload),
    switchMap(attorney => {
      return this.attorneyService.saveAttorney(attorney).pipe(
        map((savedAttorney: Attorney) => new AttorneySaveComplete(savedAttorney.id, savedAttorney)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getAttorneys$: Observable<Action> = this.actions$.pipe(
    ofType<AttorneysGet>(AttorneyActionTypes.ATTORNEYS_GET),
    switchMap(action => {
//      return this.attorneyService.getAttorneys().pipe(
    return this.attorneyService.getAttorneys(action.filter, action.pageRequest).pipe(  
//        map((returnedAttorneys: Attorney[]) => new AttorneysGetComplete(returnedAttorneys)),
        map((returnedAttorneys: PageResponse<Attorney>) => new AttorneysGetComplete(returnedAttorneys)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getAttorney$: Observable<Action> = this.actions$.pipe(
    ofType<AttorneyGet>(AttorneyActionTypes.ATTORNEY_GET),
    switchMap(action => {
      return this.attorneyService.getAttorney(action.payload).pipe(
        map((returnedAttorney: Attorney) => new AttorneyGetComplete(returnedAttorney)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private attorneyService: AttorneyService,
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
