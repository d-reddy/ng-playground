import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  map,
  switchMap,
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
import { Filter } from '../models/filter';
import { PageResponse} from '../../shared/pagination/models/pagination'

@Injectable()
export class AttorneyEffects {
    
  @Effect()
  createAttorney$: Observable<Action> = this.actions$.pipe(
    ofType<AttorneyCreate>(AttorneyActionTypes.ATTORNEY_CREATE),
    map(action => action.payload),
    switchMap(attorney => {
      return this.attorneyService.createAttorney(attorney).pipe(
        map((createdAttorney: Attorney) => new AttorneyCreateComplete(createdAttorney)),
        //need to figure out what we want to do when we encounter an error response.
        //catchError(err => of(new SearchError(err)))
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
        //catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getAttorneys$: Observable<Action> = this.actions$.pipe(
    ofType<AttorneysGet>(AttorneyActionTypes.ATTORNEYS_GET),
    switchMap(action => {
      return this.attorneyService.getAttorneys(<Filter>action.filter, action.pageRequest).pipe(  
        map((returnedAttorneys: PageResponse<Attorney>) => new AttorneysGetComplete(returnedAttorneys)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getAttorney$: Observable<Action> = this.actions$.pipe(
    ofType<AttorneyGet>(AttorneyActionTypes.ATTORNEY_GET),
    switchMap(action => {
      return this.attorneyService.getAttorney(action.payload).pipe(
        map((returnedAttorney: Attorney) => new AttorneyGetComplete(returnedAttorney)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private attorneyService: AttorneyService
  ) {}
}
