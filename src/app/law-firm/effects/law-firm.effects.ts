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

import { LawFirmService } from '../services/law-firm.service';
import {
  LawFirmActionTypes,
  LawFirmCreate,
  LawFirmCreateComplete,
  LawFirmsGet,
  LawFirmsGetComplete,
  LawFirmSave,
  LawFirmSaveComplete,
  LawFirmGet,
  LawFirmGetComplete
} from '../actions/law-firm.actions';

import { LawFirm } from '../models/lawFirm';
import { PageResponse} from '../../shared/pagination/models/pagination'

//may need this when working on lawFirm filtering
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
export class LawFirmEffects {
    
  @Effect()
  createLawFirm$: Observable<Action> = this.actions$.pipe(
    ofType<LawFirmCreate>(LawFirmActionTypes.LAW_FIRM_CREATE),
    map(action => action.payload),
    switchMap(lawFirm => {
      return this.lawFirmService.createLawFirm(lawFirm).pipe(
        map((createdLawFirm: LawFirm) => new LawFirmCreateComplete(createdLawFirm)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  saveLawFirm$: Observable<Action> = this.actions$.pipe(
    ofType<LawFirmSave>(LawFirmActionTypes.LAW_FIRM_SAVE),
    map(action => action.payload),
    switchMap(lawFirm => {
      return this.lawFirmService.saveLawFirm(lawFirm).pipe(
        map((savedLawFirm: LawFirm) => new LawFirmSaveComplete(savedLawFirm.id, savedLawFirm)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getLawFirms$: Observable<Action> = this.actions$.pipe(
    ofType<LawFirmsGet>(LawFirmActionTypes.LAW_FIRMS_GET),
    switchMap(action => {
//      return this.lawFirmService.getLawFirms().pipe(
    return this.lawFirmService.getLawFirms(action.filter, action.pageRequest).pipe(  
//        map((returnedLawFirms: LawFirm[]) => new LawFirmsGetComplete(returnedLawFirms)),
        map((returnedLawFirms: PageResponse<LawFirm>) => new LawFirmsGetComplete(returnedLawFirms)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getLawFirm$: Observable<Action> = this.actions$.pipe(
    ofType<LawFirmGet>(LawFirmActionTypes.LAW_FIRM_GET),
    switchMap(action => {
      return this.lawFirmService.getLawFirm(action.payload).pipe(
        map((returnedLawFirm: LawFirm) => new LawFirmGetComplete(returnedLawFirm)),
//      catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private lawFirmService: LawFirmService,
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
