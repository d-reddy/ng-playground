import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Patient } from '../models/patient';

const PATIENTS = [
    {
       id: 1,
       name: 'homer j simpson',
       dob: '01/11/63'     
    },
    {
        id: 2,
        name: 'marge simpson',
        dob: '11/02/63'   
    },
    {
        id: 3,
        name: 'batholomew simpson',
        dob: '07/19/79'   
    },
    {
        id: 4,
        name: 'lisa simpson',
        dob: '07/12/82'   
    },
    {
        id: 5,
        name: 'maggie simpson',
        dob: '05/30/63'   
    }        
];

@Injectable()
export class PatientService {
  private API_PATH = '...';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    //execute some api call to fetch patients

    //just mocking out an observable response
    return of(PATIENTS);
  }

  getPatient(id:number){
    //cheap stub for testing, would need to actually go out to fetch patient detail      
    let test = this.getPatients().pipe(
        map(patients => patients.find(patient => patient.id === id))
      );

    return test;
  }

  createPatient(patient:Patient): Observable<Patient> {
    //execute some api call to create patient

    //just mocking out an observable response
    return of(patient);
  }

  savePatient(patient:Patient): Observable<Patient> {
    //execute some api call to create patient
    
    //just mocking out an observable response
    return of(patient);
  }
}
