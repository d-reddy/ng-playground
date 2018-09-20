import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClaimsAdjuster } from '../models/claimsAdjuster';
import { PaginationService } from '../../shared/pagination/services/pagination.service';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

@Injectable()
export class ClaimsAdjusterService {
  //this is just a hack for testing
  private API_PATH = 'claimsadjusters';

  constructor(private http: HttpClient, private paginationService: PaginationService) {}

  getClaimsAdjusters(filter: null | object, pageRequest: PageRequest): Observable<PageResponse<ClaimsAdjuster>> {
    //execute some api call to fetch claimsAdjusters

    //just mocking out an observable response
    return this.paginationService.queryPaginated<ClaimsAdjuster>(this.http, this.API_PATH, filter, pageRequest);
  }

  getClaimsAdjuster(id:number){
    //cheap stub for testing, would need to actually go out to fetch claimsAdjuster detail      
    let test = this.getClaimsAdjusters(null, <PageRequest> {pageIndex:0, pageSize:100 } ).pipe(
        map(pagedClaimsAdjusters => pagedClaimsAdjusters.results.find(claimsAdjuster => claimsAdjuster.id === id))
      );

    return test;
  }

  createClaimsAdjuster(claimsAdjuster:ClaimsAdjuster): Observable<ClaimsAdjuster> {
    //execute some api call to create claimsAdjuster

    //just mocking out an observable response
    return of(claimsAdjuster);
  }

  saveClaimsAdjuster(claimsAdjuster:ClaimsAdjuster): Observable<ClaimsAdjuster> {
    //execute some api call to create claimsAdjuster
    
    //just mocking out an observable response
    return of(claimsAdjuster);
  }

}
