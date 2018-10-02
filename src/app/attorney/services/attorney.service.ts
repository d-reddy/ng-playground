import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Attorney } from '../models/attorney';
import { Filter } from '../models/filter';
import { PaginationService } from '../../shared/pagination/services/pagination.service';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

@Injectable()
export class AttorneyService {
  
  //this is just a hack for testing
  private API_PATH = 'attorneys';

  constructor(private http: HttpClient, private paginationService: PaginationService) {}

  getAttorneys(filter: null | Filter, pageRequest: PageRequest): Observable<PageResponse<Attorney>> {
    //execute some api call to fetch attorneys
    // if (filter && filter.searchTerm){

    // }

    //just mocking out an observable response
    return this.paginationService.queryPaginated<Attorney>(this.http, this.API_PATH, filter, pageRequest);
  }

  getAttorney(id:number){
    //cheap stub for testing, would need to actually go out to fetch attorney detail      
    let test = this.getAttorneys(null, <PageRequest> {pageIndex:0, pageSize:100 } ).pipe(
        map(pagedAttorneys => pagedAttorneys.results.find(attorney => attorney.id === id))
      );

    return test;
  }

  createAttorney(attorney:Attorney): Observable<Attorney> {
    //execute some api call to create attorney

    //just mocking out an observable response
    return of(attorney);
  }

  saveAttorney(attorney:Attorney): Observable<Attorney> {
    //execute some api call to create attorney
    
    //just mocking out an observable response
    return of(attorney);
  }

}
