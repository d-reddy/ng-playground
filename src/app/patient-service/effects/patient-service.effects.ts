import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  map,
  switchMap,
} from 'rxjs/operators';

import { PatientServiceService } from '../services/patient-service.service';
import {
  PatientServiceActionTypes,
  PatientServiceCreate,
  PatientServiceCreateComplete,
  PatientServicesGet,
  PatientServicesGetComplete,
  PatientServiceSave,
  PatientServiceSaveComplete,
  PatientServiceGet,
  PatientServiceGetComplete,
} from '../actions/patient-service.actions';

import { PatientService } from '../models/patientService';
import { PageResponse} from '../../shared/pagination/models/pagination'

@Injectable()
export class PatientServiceEffects {
    
  @Effect()
  createPatientService$: Observable<Action> = this.actions$.pipe(
    ofType<PatientServiceCreate>(PatientServiceActionTypes.PATIENTSERVICE_CREATE),
    map(action => action.payload),
    switchMap(patientService => {
      return this.patientServiceService.createPatientService(patientService).pipe(
        map((createdPatientService: PatientService) => new PatientServiceCreateComplete(createdPatientService)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  savePatientService$: Observable<Action> = this.actions$.pipe(
    ofType<PatientServiceSave>(PatientServiceActionTypes.PATIENTSERVICE_SAVE),
    map(action => action.payload),
    switchMap(patientService => {
      return this.patientServiceService.savePatientService(patientService).pipe(
        map((savedPatientService: PatientService) => new PatientServiceSaveComplete(savedPatientService.id, savedPatientService)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getPatientServices$: Observable<Action> = this.actions$.pipe(
    ofType<PatientServicesGet>(PatientServiceActionTypes.PATIENTSERVICES_GET),
    switchMap(action => {
    return this.patientServiceService.getPatientServices(action.filter, action.pageRequest).pipe(  
        map((returnedPatientServices: PageResponse<PatientService>) => new PatientServicesGetComplete(returnedPatientServices)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getPatientService$: Observable<Action> = this.actions$.pipe(
    ofType<PatientServiceGet>(PatientServiceActionTypes.PATIENTSERVICE_GET),
    switchMap(action => {
      return this.patientServiceService.getPatientService(action.payload).pipe(
        map((returnedPatientService: PatientService) => new PatientServiceGetComplete(returnedPatientService)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private patientServiceService: PatientServiceService
  ) {}
}
