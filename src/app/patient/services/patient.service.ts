import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Patient } from '../models/patient';

@Injectable()
export class PatientService {
  private API_PATH = '...';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    //execute some api call to fetch patients
    var patients: Patient[];

    patients = [
        {
           name: 'homer j simpson',
           dob: '01/23/63'     
        },
        {
            name: 'marge simpson',
            dob: '01/23/63'   
        }
    ]

    //just mocking out an observable response
    return Observable.create(patients);
  }

  addPatient(patient:Patient): Observable<Patient> {
    //execute some api call to create patient

    //just mocking out an observable response
    return of(patient);
  }

}
