import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  map,
  switchMap,
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

@Injectable()
export class ClaimsAdjusterEffects {
    
  @Effect()
  createClaimsAdjuster$: Observable<Action> = this.actions$.pipe(
    ofType<ClaimsAdjusterCreate>(ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_CREATE),
    map(action => action.payload),
    switchMap(claimsAdjuster => {
      return this.claimsAdjusterService.createClaimsAdjuster(claimsAdjuster).pipe(
        map((createdClaimsAdjuster: ClaimsAdjuster) => new ClaimsAdjusterCreateComplete(createdClaimsAdjuster)),
        //catchError(err => of(new SearchError(err)))
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
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getClaimsAdjusters$: Observable<Action> = this.actions$.pipe(
    ofType<ClaimsAdjustersGet>(ClaimsAdjusterActionTypes.CLAIMS_ADJUSTERS_GET),
    switchMap(action => {
    return this.claimsAdjusterService.getClaimsAdjusters(action.filter, action.pageRequest).pipe(  
        map((returnedClaimsAdjusters: PageResponse<ClaimsAdjuster>) => new ClaimsAdjustersGetComplete(returnedClaimsAdjusters)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getClaimsAdjuster$: Observable<Action> = this.actions$.pipe(
    ofType<ClaimsAdjusterGet>(ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_GET),
    switchMap(action => {
      return this.claimsAdjusterService.getClaimsAdjuster(action.payload).pipe(
        map((returnedClaimsAdjuster: ClaimsAdjuster) => new ClaimsAdjusterGetComplete(returnedClaimsAdjuster)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private claimsAdjusterService: ClaimsAdjusterService
  ) {}
}
