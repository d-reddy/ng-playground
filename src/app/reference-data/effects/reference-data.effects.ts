import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  map,
  switchMap,
} from 'rxjs/operators';

import { ReferenceDataService } from '../services/reference-data.service';
import {
  ReferenceDataActionTypes,
  ReferenceDataGet,
  ReferenceDataGetComplete
} from '../actions/reference-data.actions';

import { ReferenceData } from '../models/referenceData';

@Injectable()
export class ReferenceDataEffects {
    
  @Effect()
  getReferenceData$: Observable<Action> = this.actions$.pipe(
    ofType<ReferenceDataGet>(ReferenceDataActionTypes.REFERENCE_DATA_GET),
    switchMap(action => {
      return this.referenceDataService.getReferenceData().pipe(
        map((returnedReferenceData: ReferenceData) => new ReferenceDataGetComplete(returnedReferenceData)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private referenceDataService: ReferenceDataService
  ) {}
}
