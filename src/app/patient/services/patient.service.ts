import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Patient } from '../models/patient';
import { Address } from '../models/address';

const PATIENTS = [
    {
       id: 1,
       firstName: 'homer',
       middleName: 'j',
       lastName: 'simpson',
       dob: '01/11/63',
       phone: '815.333.1234',
       email: 'homer.simpson@gmail.com',
       notes: 'forgot drivers license',
       currentAddress: {
          address: '123 Fake st',
          city: 'springfield',
          state: 'il',
          zip: '60515',
          until: ''
       },
       addressHistory: []
    },
    {
      id: 2,
      firstName: 'marge',
      middleName: '',
      lastName: 'simpson',
      dob: '11/02/63',
      phone: '815.333.1234',
      email: 'marge.simpson@gmail.com',
      notes: '',
      currentAddress: {
         address: '123 Fake st',
         city: 'springfield',
         state: 'il',
         zip: '60515',
         until: ''
      },
      addressHistory: []
   },
    {
      id: 3,
      firstName: 'bartholomew',
      middleName: 'j',
      lastName: 'simpson',
      dob: '07/19/79',
      phone: '815.333.1234',
      email: 'bart.simpson@gmail.com',
      notes: '',
      currentAddress: {
         address: '200 Fake st',
         city: 'springfield',
         state: 'il',
         zip: '60515',
         until: ''
      },
      addressHistory: [
        {
          address: '123 Fake st',
          city: 'springfield',
          state: 'il',
          zip: '60515',
          until: '01/01/2000'
       },
       {
        address: '18 Nowhere st',
        city: 'chicago',
        state: 'il',
        zip: '60661',
        until: '12/31/1999'
     }
      ]
   },
    {
      id: 4,
      firstName: 'lisa',
      middleName: '',
      lastName: 'simpson',
      dob: '08/12/82',
      phone: '815.333.1234',
      email: 'lisa.simpson@gmail.com',
      notes: '',
      currentAddress: {
         address: '123 Fake st',
         city: 'springfield',
         state: 'il',
         zip: '60515',
         until: ''
      },
      addressHistory: []
   },
    {
      id: 5,
      firstName: 'maggie',
      middleName: '',
      lastName: 'simpson',
      dob: '05/30/85',
      phone: '815.333.1234',
      email: 'maggie.simpson@gmail.com',
      notes: '',
      currentAddress: {
         address: '123 Fake st',
         city: 'springfield',
         state: 'il',
         zip: '60515',
         until: ''       
      },
      addressHistory: []
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
