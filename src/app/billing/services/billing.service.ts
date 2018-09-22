import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ExamBillingLedger } from '../models/examBillingLedger'; 
import { PaymentActivity } from '../models/paymentActivity';
import { PaginationService } from '../../shared/pagination/services/pagination.service';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'
import { BillingJournal } from '../models/billingJournal';

@Injectable()
export class BillingService {
  //this is just a hack for testing
  private API_PATH = 'billings';

  constructor(private http: HttpClient, private paginationService: PaginationService) {}

  getBillings(filter: null | object, pageRequest: PageRequest): Observable<PageResponse<ExamBillingLedger>> {
    //execute some api call to fetch billings
    //just mocking out an observable response
    //include in filter query string something like http://....?includeBillingActivities=false

    return this.paginationService.queryPaginated<ExamBillingLedger>(this.http, this.API_PATH, filter, pageRequest);
  }

  getBilling(id:number) : Observable<ExamBillingLedger>{
    //cheap stub for testing, would need to actually go out to fetch billing detail      
    //include in filter query string something like http://....?includeBillingActivities=false

    var billingData = <ExamBillingLedger>{
      id: 1,
      patientServiceId: 1,
      patientName: 'bill bo',
      patientId: 1,
      doctorName: 'tim doctor',
      doctorId: 1,
      examId: 1,
      exam: 'brain mri',
      dateOfService: new Date('04/03/04'),
      statusId: 1,
      amount: 1000,
      patientBillingJournals: [
        <BillingJournal>{
          id: 1,
          dateBilled: new Date('04/13/04'),
          amount: 1000,
          balance: 1000,
          statusId: 1,           //open, settled, collections, etc

          ledgerId: 1,       //examBillingId or lopCaseId since an LOP Case can be associated with multiple exams
          ledgerTypeId: 1,   //individual exam vs a bill tied to a lop which could be for a group of exams

          billedEntityId: 1,     //patientId, insuranceProviderId, lawfirmId, attorneyId
          billedEntityTypeId: 1, //patient, insurance provider, law firm, attorney
          billedEntityName: 'jim bo',

          contactActivities: [],
          paymentActivities: [<PaymentActivity>{
            amount: 100,
            billingActivityId: 1,
            datePaid: new Date('12/12/17')
          }],
          negotiationActivities: []
        }
      ],
      insuranceBillingJournals: [
        <BillingJournal>{
          id: 1,
          dateBilled: new Date('04/13/04'),
          amount: 1000,
          balance: 1000,
          statusId: 1,            //open, settled, collections, etc

          ledgerId: 1,       //examBillingId or lopCaseId since an LOP Case can be associated with multiple exams
          ledgerTypeId: 1,   //individual exam vs a bill tied to a lop which could be for a group of exams

          billedEntityId: 1,     //patientId, insuranceProviderId, lawfirmId, attorneyId
          billedEntityTypeId: 1, //patient, insurance provider, law firm, attorney
          billedEntityName: 'geico',

          contactActivities: [],
          paymentActivities: [],
          negotiationActivities: []
        }
      ],
      lopCaseId: 0      
   };

    return of(billingData);
  }

  createBilling(billing:ExamBillingLedger): Observable<ExamBillingLedger> {
    //execute some api call to create billing

    //just mocking out an observable response
    return of(billing);
  }

  saveBilling(billing:ExamBillingLedger): Observable<ExamBillingLedger> {
    //execute some api call to create billing
    
    //just mocking out an observable response
    return of(billing);
  }


  //journal

  getBillingJournal(id:number) : Observable<BillingJournal>{
    //cheap stub for testing, would need to actually go out to fetch billing detail      
    //include in filter query string something like http://....?includeBillingActivities=false

    var billingJournal =  <BillingJournal>{
      id: 1,
      dateBilled: new Date('04/13/04'),
      amount: 1000,
      balance: 1000,
      statusId: 1,           //open, settled, collections, etc

      ledgerId: 1,       //examBillingId or lopCaseId since an LOP Case can be associated with multiple exams
      ledgerTypeId: 1,   //individual exam vs a bill tied to a lop which could be for a group of exams

      billedEntityId: 1,     //patientId, insuranceProviderId, lawfirmId, attorneyId
      billedEntityTypeId: 1, //patient, insurance provider, law firm, attorney
      billedEntityName: 'jim bo',

      contactActivities: [],
      paymentActivities: [<PaymentActivity>{
        amount: 100,
        billingActivityId: 1,
        datePaid: new Date('12/12/17')
      }],
      negotiationActivities: []
    };

    return of(billingJournal);
  }

  createBillingJournal(billingJournal:BillingJournal): Observable<BillingJournal> {
    //execute some api call to create billing

    //just mocking out an observable response
    return of(billingJournal);
  }

  saveBillingJournal(billingJournal:BillingJournal): Observable<BillingJournal> {
    //execute some api call to create billing
    
    //just mocking out an observable response
    return of(billingJournal);
  }

}
