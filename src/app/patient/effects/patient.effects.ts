import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  map,
  switchMap,
} from 'rxjs/operators';

import { PatientService } from '../services/patient.service';
import {
  PatientActionTypes,
  PatientCreate,
  PatientCreateComplete,
  PatientsGet,
  PatientsGetComplete,
  PatientSave,
  PatientSaveComplete,
  PatientGet,
  PatientGetComplete
} from '../actions/patient.actions';

import { Patient } from '../models/patient';
import { PageResponse} from '../../shared/pagination/models/pagination'

@Injectable()
export class PatientEffects {
    
  @Effect()
  createPatient$: Observable<Action> = this.actions$.pipe(
    ofType<PatientCreate>(PatientActionTypes.PATIENT_CREATE),
    map(action => action.payload),
    switchMap(patient => {
      return this.patientService.createPatient(patient).pipe(
        map((createdPatient: Patient) => new PatientCreateComplete(createdPatient)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  savePatient$: Observable<Action> = this.actions$.pipe(
    ofType<PatientSave>(PatientActionTypes.PATIENT_SAVE),
    map(action => action.payload),
    switchMap(patient => {
      return this.patientService.savePatient(patient).pipe(
        map((savedPatient: Patient) => new PatientSaveComplete(savedPatient.id, savedPatient)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getPatients$: Observable<Action> = this.actions$.pipe(
    ofType<PatientsGet>(PatientActionTypes.PATIENTS_GET),
    switchMap(action => {
    return this.patientService.getPatients(action.filter, action.pageRequest).pipe(  
        map((returnedPatients: PageResponse<Patient>) => new PatientsGetComplete(returnedPatients)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getPatient$: Observable<Action> = this.actions$.pipe(
    ofType<PatientGet>(PatientActionTypes.PATIENT_GET),
    switchMap(action => {
      return this.patientService.getPatient(action.payload).pipe(
        map((returnedPatient: Patient) => new PatientGetComplete(returnedPatient)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private patientService: PatientService
  ) {}
}
