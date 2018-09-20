import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { LawFirm } from '../models/lawFirm';
import { PaginationService } from '../../shared/pagination/services/pagination.service';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

@Injectable()
export class LawFirmService {
  //this is just a hack for testing
  private API_PATH = 'lawfirms';

  constructor(private http: HttpClient, private paginationService: PaginationService) {}

  getLawFirms(filter: null | object, pageRequest: PageRequest): Observable<PageResponse<LawFirm>> {
    //execute some api call to fetch lawFirms

    //just mocking out an observable response
    return this.paginationService.queryPaginated<LawFirm>(this.http, this.API_PATH, filter, pageRequest);
  }

  getLawFirm(id:number){
    //cheap stub for testing, would need to actually go out to fetch lawFirm detail      
    let test = this.getLawFirms(null, <PageRequest> {pageIndex:0, pageSize:100 } ).pipe(
        map(pagedLawFirms => pagedLawFirms.results.find(lawFirm => lawFirm.id === id))
      );

    return test;
  }

  createLawFirm(lawFirm:LawFirm): Observable<LawFirm> {
    //execute some api call to create lawFirm

    //just mocking out an observable response
    return of(lawFirm);
  }

  saveLawFirm(lawFirm:LawFirm): Observable<LawFirm> {
    //execute some api call to create lawFirm
    
    //just mocking out an observable response
    return of(lawFirm);
  }

}
