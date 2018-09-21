import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ExamBillingSummary } from '../models/examBillingSummary';
import { PaginationService } from '../../shared/pagination/services/pagination.service';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

@Injectable()
export class BillingService {
  //this is just a hack for testing
  private API_PATH = 'billings';

  constructor(private http: HttpClient, private paginationService: PaginationService) {}

  getBillings(filter: null | object, pageRequest: PageRequest): Observable<PageResponse<ExamBillingSummary>> {
    //execute some api call to fetch billings

    //just mocking out an observable response
    return this.paginationService.queryPaginated<ExamBillingSummary>(this.http, this.API_PATH, filter, pageRequest);
  }

  getBilling(id:number){
    //cheap stub for testing, would need to actually go out to fetch billing detail      
    let test = this.getBillings(null, <PageRequest> {pageIndex:0, pageSize:100 } ).pipe(
        map(pagedBillings => pagedBillings.results.find(billing => billing.id === id))
      );

    return test;
  }

  createBilling(billing:ExamBillingSummary): Observable<ExamBillingSummary> {
    //execute some api call to create billing

    //just mocking out an observable response
    return of(billing);
  }

  saveBilling(billing:ExamBillingSummary): Observable<ExamBillingSummary> {
    //execute some api call to create billing
    
    //just mocking out an observable response
    return of(billing);
  }

}
