//inspired by: https://medium.com/@JeremyLaine/server-side-pagination-and-filtering-with-angular-6-280a7909e783
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { PageRequest, PageResponse } from '../models/pagination';

let serviceData = { 
  patients: [
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
  ],

 doctors: [
    {
      id: 1,
      firstName: 'tim',
      middleName: '',
      lastName: 'doctor',
      dob: '01/11/60',
      phone: '815.300.1234',
      email: 'tim.doctor@gmail.com',
    },
    {
      id: 2,
      firstName: 'jawartolo',
      middleName: '',
      lastName: 'melancholoy',
      dob: '11/30/70',
      phone: '815.343.1234',
      email: 'jawartolo.melancholoy@gmail.com',
    },
    {
      id: 3,
      firstName: 'smith',
      middleName: '',
      lastName: 'smithburg',
      dob: '07/19/79',
      phone: '815.323.1234',
      email: 'smith.smithburg@gmail.com',
    }
  ],

  patientServices: [
    {
      id: 1,
      medicalRecordNumber: 3,
      performedExams: [{
        patientServiceId: 1,
        examId: 1,
        doctorId: 1
      },{
        patientServiceId: 1,
        examId: 2,
        doctorId: 2
      }],
      dateOfService: new Date(2018,10,11)
    }
  ],

  insuranceProviders: [
    {
       id: 1,
       name: 'geico',
       phone: '815.333.1234',
       fax: '815.332.2322',
       email: 'jim.smith@geico.com',
       notes: 'some note',
       currentAddress: {
          address: '123 Fake st',
          city: 'springfield',
          state: 'il',
          zip: '60515',
          until: ''
       }
    }
  ],

  lawFirms: [
    {
       id: 1,
       name: 'BobLobLaw Firm',
       phone: '815.333.1234',
       fax: '815.332.2322',
       email: 'bob.loblaw@loblaw.com',
       notes: 'some law note',
       currentAddress: {
          address: '125 Fake st',
          city: 'springfield',
          state: 'il',
          zip: '60515',
          until: ''
       }
    }
  ],
    
  claimsAdjusters: [
    {
       id: 1,
       firstName: 'smith',
       middleName: '',
       lastName: 'smithburg',       
       phone: '815.333.1234',
       fax: '815.332.2322',
       email: 'smith.smithburg@adj.com',
       notes: 'some adj note',
       insuranceProviderIds: [],
       currentAddress: {
          address: '125 Fake st',
          city: 'springfield',
          state: 'il',
          zip: '60515',
          until: ''
       }
    }
  ],

  attorneys: [
    {
       id: 1,
       firstName: 'bob',
       middleName: '',
       lastName: 'loblaw',       
       phone: '815.333.1234',
       fax: '815.332.2322',
       email: 'bob.loblaw@boboblawfirm.com',
       notes: 'some attorney note',
       lawFirmId: 0,
       currentAddress: {
          address: '125 Fake st',
          city: 'springfield',
          state: 'il',
          zip: '60515',
          until: ''
       }
    },
    {
      id: 2,
      firstName: 'tim',
      middleName: '',
      lastName: 'smith',       
      phone: '815.333.1234',
      fax: '815.332.2322',
      email: 'bob.loblaw@boboblawfirm.com',
      notes: 'some attorney note',
      lawFirmId: 0,
      currentAddress: {
         address: '125 Fake st',
         city: 'springfield',
         state: 'il',
         zip: '60515',
         until: ''
      }
   },
   {
    id: 3,
    firstName: 'dean',
    middleName: '',
    lastName: 'jones',       
    phone: '815.333.1234',
    fax: '815.332.2322',
    email: 'bob.loblaw@boboblawfirm.com',
    notes: 'some attorney note',
    lawFirmId: 0,
    currentAddress: {
       address: '125 Fake st',
       city: 'springfield',
       state: 'il',
       zip: '60515',
       until: ''
    }
   },
    {
      id: 4,
      firstName: 'harry',
      middleName: '',
      lastName: 'smith',       
      phone: '815.333.1234',
      fax: '815.332.2322',
      email: 'bob.loblaw@boboblawfirm.com',
      notes: 'some attorney note',
      lawFirmId: 0,
      currentAddress: {
        address: '125 Fake st',
        city: 'springfield',
        state: 'il',
        zip: '60515',
        until: ''
      }
    },
    {
      id: 5,
      firstName: 'scott',
      middleName: '',
      lastName: 'smith',       
      phone: '815.333.1234',
      fax: '815.332.2322',
      email: 'bob.loblaw@boboblawfirm.com',
      notes: 'some attorney note',
      lawFirmId: 0,
      currentAddress: {
        address: '125 Fake st',
        city: 'springfield',
        state: 'il',
        zip: '60515',
        until: ''
      }
    },
    {
      id: 6,
      firstName: 'patrick',
      middleName: '',
      lastName: 'smith',       
      phone: '815.333.1234',
      fax: '815.332.2322',
      email: 'bob.loblaw@boboblawfirm.com',
      notes: 'some attorney note',
      lawFirmId: 0,
      currentAddress: {
        address: '125 Fake st',
        city: 'springfield',
        state: 'il',
        zip: '60515',
        until: ''
      }
    },
    {
      id: 7,
      firstName: 'dennis',
      middleName: '',
      lastName: 'smith',       
      phone: '815.333.1234',
      fax: '815.332.2322',
      email: 'bob.loblaw@boboblawfirm.com',
      notes: 'some attorney note',
      lawFirmId: 0,
      currentAddress: {
        address: '125 Fake st',
        city: 'springfield',
        state: 'il',
        zip: '60515',
        until: ''
      }
    }
  ],

  billings: [
    {
       id: 1,
       patientName: 'bill bo',
       doctorName: 'tim doctor',
       patientId: 1,
       exam: 'brain mri',
       dateOfService: '04/03/04',
       statusId: 1,
       amount: 1000
    }
  ],

  lops: [
    {
       id: 1,
       firstName: 'lop',
       middleName: '',
       lastName: 'loppingsworth',       
       phone: '815.333.1234',
       fax: '815.332.2322',
       email: 'lop@lop.com',
       notes: 'some lop note',
       lawFirmId: 0,
       currentAddress: {
          address: '125 Fake st',
          city: 'springfield',
          state: 'il',
          zip: '60515',
          until: ''
       }
    }
  ]
}


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

      //here is where we'd call out to the api, and pass filter parameters
      // return http.get<PageResponse<T>>(url, {
      //   params: params
      // });

      let data;

      if (url == 'patients') data = serviceData.patients;
      if (url == 'doctors') data = serviceData.doctors;
      if (url == 'patientServices') data = serviceData.patientServices;
      if (url == 'insuranceproviders') data = serviceData.insuranceProviders;
      if (url == 'lawfirms') data = serviceData.lawFirms;
      if (url == 'claimsadjusters') data = serviceData.claimsAdjusters;
      if (url == 'attorneys') data = serviceData.attorneys;
      if (url == 'billings') data = serviceData.billings;
      if (url == 'lops') data = serviceData.lops;


      var filteredData = [];
      var dataIds = [];
      //just some mock filtering for testing
      if (filter){
        Object.keys(filter).sort().forEach(filterKey => {
          //filter value
          var filterVal = filter[filterKey];

          data.forEach(item => {
            var dataVal = item[filterKey];

            if (filterVal){
              if (dataVal && dataVal.toLowerCase().indexOf(filterVal.toLowerCase()) >= 0){
                if (!dataIds.includes(item.id)){
                  filteredData.push(item);
                  dataIds.push(item.id);
                }
              } 
            } else {
              if (!dataIds.includes(item.id)){
                filteredData.push(item);
                dataIds.push(item.id);
              }
          }
          });
        });
      } else {
        filteredData = data;
      }
      
      let response = <PageResponse<T>>{
        total: filteredData.length,      // total number of items in full collection
        pageIndex: pageRequest.pageIndex,  // page index returned
        pageSize: 2,   // count per page
        results:  (filteredData.slice(pageRequest.pageIndex*pageRequest.pageSize, pageRequest.pageIndex*pageRequest.pageSize + pageRequest.pageSize)) as Array<any>// items for the current page
      };

      return of(response);
  }
}
