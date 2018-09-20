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

import { ClaimsAdjusterService } from '../services/claims-adjuster.service';
import {
  ClaimsAdjusterActionTypes,
  ClaimsAdjusterCreate,
  ClaimsAdjusterCreateComplete,
  ClaimsAdjustersGet,
  ClaimsAdjustersGetComplete,
  ClaimsAdjusterSave,
  ClaimsAdjusterSaveComplete,
  ClaimsAdjusterGet,
  ClaimsAdjusterGetComplete
} from '../actions/claims-adjuster.actions';

import { ClaimsAdjuster } from '../models/claimsAdjuster';
import { PageResponse} from '../../shared/pagination/models/pagination'

//may need this when working on claimsAdjuster filtering
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
export class ClaimsAdjusterEffects {
    
  @Effect()
  createClaimsAdjuster$: Observable<Action> = this.actions$.pipe(
    ofType<ClaimsAdjusterCreate>(ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_CREATE),
    map(action => action.payload),
    switchMap(claimsAdjuster => {
      return this.claimsAdjusterService.createClaimsAdjuster(claimsAdjuster).pipe(
        map((createdClaimsAdjuster: ClaimsAdjuster) => new ClaimsAdjusterCreateComplete(createdClaimsAdjuster)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  saveClaimsAdjuster$: Observable<Action> = this.actions$.pipe(
    ofType<ClaimsAdjusterSave>(ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_SAVE),
    map(action => action.payload),
    switchMap(claimsAdjuster => {
      return this.claimsAdjusterService.saveClaimsAdjuster(claimsAdjuster).pipe(
        map((savedClaimsAdjuster: ClaimsAdjuster) => new ClaimsAdjusterSaveComplete(savedClaimsAdjuster.id, savedClaimsAdjuster)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getClaimsAdjusters$: Observable<Action> = this.actions$.pipe(
    ofType<ClaimsAdjustersGet>(ClaimsAdjusterActionTypes.CLAIMS_ADJUSTERS_GET),
    switchMap(action => {
//      return this.claimsAdjusterService.getClaimsAdjusters().pipe(
    return this.claimsAdjusterService.getClaimsAdjusters(action.filter, action.pageRequest).pipe(  
//        map((returnedClaimsAdjusters: ClaimsAdjuster[]) => new ClaimsAdjustersGetComplete(returnedClaimsAdjusters)),
        map((returnedClaimsAdjusters: PageResponse<ClaimsAdjuster>) => new ClaimsAdjustersGetComplete(returnedClaimsAdjusters)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getClaimsAdjuster$: Observable<Action> = this.actions$.pipe(
    ofType<ClaimsAdjusterGet>(ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_GET),
    switchMap(action => {
      return this.claimsAdjusterService.getClaimsAdjuster(action.payload).pipe(
        map((returnedClaimsAdjuster: ClaimsAdjuster) => new ClaimsAdjusterGetComplete(returnedClaimsAdjuster)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private claimsAdjusterService: ClaimsAdjusterService,
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
