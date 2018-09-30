import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  map,
  switchMap,
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

@Injectable()
export class LopEffects {
    
  @Effect()
  createLop$: Observable<Action> = this.actions$.pipe(
    ofType<LopCreate>(LopActionTypes.LOP_CREATE),
    map(action => action.payload),
    switchMap(lop => {
      return this.lopService.createLop(lop).pipe(
        map((createdLop: Lop) => new LopCreateComplete(createdLop)),
        //catchError(err => of(new SearchError(err)))
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
        //catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getLops$: Observable<Action> = this.actions$.pipe(
    ofType<LopsGet>(LopActionTypes.LOPS_GET),
    switchMap(action => {
    return this.lopService.getLops(action.filter, action.pageRequest).pipe(  
        map((returnedLops: PageResponse<Lop>) => new LopsGetComplete(returnedLops)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getLop$: Observable<Action> = this.actions$.pipe(
    ofType<LopGet>(LopActionTypes.LOP_GET),
    switchMap(action => {
      return this.lopService.getLop(action.payload).pipe(
        map((returnedLop: Lop) => new LopGetComplete(returnedLop)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private lopService: LopService
  ) {}
}
