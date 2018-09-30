import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  map,
  switchMap,
} from 'rxjs/operators';

import { DoctorService } from '../services/doctor.service';
import {
  DoctorActionTypes,
  DoctorCreate,
  DoctorCreateComplete,
  DoctorsGet,
  DoctorsGetComplete,
  DoctorSave,
  DoctorSaveComplete,
  DoctorGet,
  DoctorGetComplete
} from '../actions/doctor.actions';

import { Doctor } from '../models/doctor';
import { PageResponse} from '../../shared/pagination/models/pagination'

@Injectable()
export class DoctorEffects {
    
  @Effect()
  createDoctor$: Observable<Action> = this.actions$.pipe(
    ofType<DoctorCreate>(DoctorActionTypes.DOCTOR_CREATE),
    map(action => action.payload),
    switchMap(doctor => {
      return this.doctorService.createDoctor(doctor).pipe(
        map((createdDoctor: Doctor) => new DoctorCreateComplete(createdDoctor)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  saveDoctor$: Observable<Action> = this.actions$.pipe(
    ofType<DoctorSave>(DoctorActionTypes.DOCTOR_SAVE),
    map(action => action.payload),
    switchMap(doctor => {
      return this.doctorService.saveDoctor(doctor).pipe(
        map((savedDoctor: Doctor) => new DoctorSaveComplete(savedDoctor.id, savedDoctor)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );


  @Effect()
  getDoctors$: Observable<Action> = this.actions$.pipe(
    ofType<DoctorsGet>(DoctorActionTypes.DOCTORS_GET),
    switchMap(action => {
    return this.doctorService.getDoctors(action.filter, action.pageRequest).pipe(  
        map((returnedDoctors: PageResponse<Doctor>) => new DoctorsGetComplete(returnedDoctors)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  @Effect()
  getDoctor$: Observable<Action> = this.actions$.pipe(
    ofType<DoctorGet>(DoctorActionTypes.DOCTOR_GET),
    switchMap(action => {
      return this.doctorService.getDoctor(action.payload).pipe(
        map((returnedDoctor: Doctor) => new DoctorGetComplete(returnedDoctor)),
        //catchError(err => of(new SearchError(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private doctorService: DoctorService
  ) {}
}
