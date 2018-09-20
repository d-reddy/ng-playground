import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Lop } from '../models/lop';
import { PaginationService } from '../../shared/pagination/services/pagination.service';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

@Injectable()
export class LopService {
  //this is just a hack for testing
  private API_PATH = 'lops';

  constructor(private http: HttpClient, private paginationService: PaginationService) {}

  getLops(filter: null | object, pageRequest: PageRequest): Observable<PageResponse<Lop>> {
    //execute some api call to fetch lops

    //just mocking out an observable response
    return this.paginationService.queryPaginated<Lop>(this.http, this.API_PATH, filter, pageRequest);
  }

  getLop(id:number){
    //cheap stub for testing, would need to actually go out to fetch lop detail      
    let test = this.getLops(null, <PageRequest> {pageIndex:0, pageSize:100 } ).pipe(
        map(pagedLops => pagedLops.results.find(lop => lop.id === id))
      );

    return test;
  }

  createLop(lop:Lop): Observable<Lop> {
    //execute some api call to create lop

    //just mocking out an observable response
    return of(lop);
  }

  saveLop(lop:Lop): Observable<Lop> {
    //execute some api call to create lop
    
    //just mocking out an observable response
    return of(lop);
  }

}
