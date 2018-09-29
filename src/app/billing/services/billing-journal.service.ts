import { Injectable } from '@angular/core';
import {BillingJournal} from '../models/billingJournal';
import {PaymentActivity} from '../models/paymentActivity';
import { Observable, of } from 'rxjs';
import {Attachment} from '../models/attachment';

@Injectable()
export class BillingJournalService {
    private API_PATH = 'billings_journal';

    getBillingJournal(id:number) : Observable<BillingJournal>{
        //cheap stub for testing, would need to actually go out to fetch billing detail      
        //include in filter query string something like http://....?includeBillingActivities=false
        var billingJournal = <BillingJournal>{
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
                  billingJournalId: 1,
                  datePaid: new Date('12/12/17')
                }],
                negotiationActivities: [],
                attachments: [
                    <Attachment>{
                        id: 1,
                        name: 'billing.pdf'
                    }
                ]
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
