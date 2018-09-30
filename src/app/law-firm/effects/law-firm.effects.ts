import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  map,
  switchMap,
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

@Injectable()
export class LawFirmEffects {
    
  @Effect()
  createLawFirm$: Observable<Action> = this.actions$.pipe(
    ofType<LawFirmCreate>(LawFirmActionTypes.LAW_FIRM_CREATE),
    map(action => action.payload),
    switchMap(lawFirm => {
      return this.lawFirmService.createLawFirm(lawFirm).pipe(
        map((createdLawFirm: LawFirm) => new LawFirmCreateComplete(createdLawFirm)),
        //catchError(err => of(new SearchError(err)))
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
        //catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getLawFirms$: Observable<Action> = this.actions$.pipe(
    ofType<LawFirmsGet>(LawFirmActionTypes.LAW_FIRMS_GET),
    switchMap(action => {
    return this.lawFirmService.getLawFirms(action.filter, action.pageRequest).pipe(  
        map((returnedLawFirms: PageResponse<LawFirm>) => new LawFirmsGetComplete(returnedLawFirms)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getLawFirm$: Observable<Action> = this.actions$.pipe(
    ofType<LawFirmGet>(LawFirmActionTypes.LAW_FIRM_GET),
    switchMap(action => {
      return this.lawFirmService.getLawFirm(action.payload).pipe(
        map((returnedLawFirm: LawFirm) => new LawFirmGetComplete(returnedLawFirm)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private lawFirmService: LawFirmService
  ) {}
}
