import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Doctor } from '../models/doctor';
import { PaginationService } from '../../shared/pagination/services/pagination.service';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

@Injectable()
export class DoctorService {
  //this is just a hack for testing
  private API_PATH = 'doctors';

  constructor(private http: HttpClient, private paginationService: PaginationService) {}

  getDoctors(filter: null | object, pageRequest: PageRequest): Observable<PageResponse<Doctor>> {
    //execute some api call to fetch doctors

    //just mocking out an observable response
    return this.paginationService.queryPaginated<Doctor>(this.http, this.API_PATH, filter, pageRequest);
  }

  getDoctor(id:number){
    //cheap stub for testing, would need to actually go out to fetch doctor detail      
    let test = this.getDoctors(null, <PageRequest> {pageIndex:0, pageSize:100 } ).pipe(
        map(pagedDoctors => pagedDoctors.results.find(doctor => doctor.id === id))
      );

    return test;
  }

  createDoctor(doctor:Doctor): Observable<Doctor> {
    //execute some api call to create doctor

    //just mocking out an observable response
    return of(doctor);
  }

  saveDoctor(doctor:Doctor): Observable<Doctor> {
    //execute some api call to create doctor
    
    //just mocking out an observable response
    return of(doctor);
  }

}
