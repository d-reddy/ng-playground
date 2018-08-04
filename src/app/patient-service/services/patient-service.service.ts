import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { PatientService } from '../models/patientService';
import { PaginationService } from '../../shared/pagination/services/pagination.service';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

@Injectable()
export class PatientServiceService {
  //this is just a hack for testing
  private API_PATH = 'patientServices';

  constructor(private http: HttpClient, private paginationService: PaginationService) {}

  getPatientServices(filter: null | object, pageRequest: PageRequest): Observable<PageResponse<PatientService>> {
    //execute some api call to fetch patientServices

    //just mocking out an observable response
    return this.paginationService.queryPaginated<PatientService>(this.http, this.API_PATH, filter, pageRequest);
  }

  getPatientService(id:number){
    //cheap stub for testing, would need to actually go out to fetch patientService detail      
    let test = this.getPatientServices(null, <PageRequest> {pageIndex:0, pageSize:100 } ).pipe(
        map(pagedPatientServices => pagedPatientServices.results.find(patientService => patientService.id === id))
      );

    return test;
  }

  createPatientService(patientService:PatientService): Observable<PatientService> {
    //execute some api call to create patientService

    //just mocking out an observable response
    return of(patientService);
  }

  savePatientService(patientService:PatientService): Observable<PatientService> {
    //execute some api call to create patientService
    
    //just mocking out an observable response
    return of(patientService);
  }

}
