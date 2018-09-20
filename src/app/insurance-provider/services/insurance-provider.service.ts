import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { InsuranceProvider } from '../models/insuranceProvider';
import { PaginationService } from '../../shared/pagination/services/pagination.service';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

@Injectable()
export class InsuranceProviderService {
  //this is just a hack for testing
  private API_PATH = 'insuranceproviders';

  constructor(private http: HttpClient, private paginationService: PaginationService) {}

  getInsuranceProviders(filter: null | object, pageRequest: PageRequest): Observable<PageResponse<InsuranceProvider>> {
    //execute some api call to fetch insuranceProviders

    //just mocking out an observable response
    return this.paginationService.queryPaginated<InsuranceProvider>(this.http, this.API_PATH, filter, pageRequest);
  }

  getInsuranceProvider(id:number){
    //cheap stub for testing, would need to actually go out to fetch insuranceProvider detail      
    let test = this.getInsuranceProviders(null, <PageRequest> {pageIndex:0, pageSize:100 } ).pipe(
        map(pagedInsuranceProviders => pagedInsuranceProviders.results.find(insuranceProvider => insuranceProvider.id === id))
      );

    return test;
  }

  createInsuranceProvider(insuranceProvider:InsuranceProvider): Observable<InsuranceProvider> {
    //execute some api call to create insuranceProvider

    //just mocking out an observable response
    return of(insuranceProvider);
  }

  saveInsuranceProvider(insuranceProvider:InsuranceProvider): Observable<InsuranceProvider> {
    //execute some api call to create insuranceProvider
    
    //just mocking out an observable response
    return of(insuranceProvider);
  }

}
