import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Patient } from '../models/patient';
import { PaginationService } from '../../shared/pagination/services/pagination.service';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

@Injectable()
export class PatientService {
  //this is just a hack for testing
  private API_PATH = 'patients';

  constructor(private http: HttpClient, private paginationService: PaginationService) {}

  getPatients(filter: null | object, pageRequest: PageRequest): Observable<PageResponse<Patient>> {
    //execute some api call to fetch patients

    //just mocking out an observable response
    return this.paginationService.queryPaginated<Patient>(this.http, this.API_PATH, filter, pageRequest);
  }

  getPatient(id:number){
    //cheap stub for testing, would need to actually go out to fetch patient detail      
    let test = this.getPatients(null, <PageRequest> {pageIndex:0, pageSize:100 } ).pipe(
        map(pagedPatients => pagedPatients.results.find(patient => patient.id === id))
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
