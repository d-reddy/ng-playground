//inspired by: https://medium.com/@JeremyLaine/server-side-pagination-and-filtering-with-angular-6-280a7909e783
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { PageRequest, PageResponse } from '../models/pagination';



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
  export class PaginationService {
    queryPaginated<T>(http: HttpClient, baseUrl: string, filter: object, pageRequest: PageRequest): Observable<PageResponse<any>> {
      let params = new HttpParams();
      let url = baseUrl;

      //add paging criteria to request
      Object.keys(pageRequest).sort().forEach(key => {
        const value = pageRequest[key];
        if (value !== null) {
          params = params.set(key, value.toString());
        }
      });

      //add filtering criteria to request
      if (typeof filter === 'object' && filter) {
        // we were given filtering criteria, build the query string
        Object.keys(filter).sort().forEach(key => {
          const value = filter[key];
          if (value !== null) {
            params = params.set(key, value.toString());
          }
        });
      }

      // return http.get<PageResponse<T>>(url, {
      //   params: params
      // });

     
      let response = <PageResponse<T>>{
        total: 5,      // total number of items in full collection
        pageIndex: pageRequest.pageIndex,  // page index returned
        pageSize: 2,   // count per page
        results:  (PATIENTS.slice(pageRequest.pageIndex*pageRequest.pageSize, pageRequest.pageIndex*pageRequest.pageSize + 2)) as Array<any>// items for the current page
      };

      return of(response);
  }
}
