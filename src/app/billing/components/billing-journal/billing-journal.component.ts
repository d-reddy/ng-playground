import { FormGroup, FormArray, FormBuilder,  Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators';

import * as reducer from '../../reducers';
import * as actions from '../../actions/billing-journal.actions';
import { BillingJournal } from '../../models/billingJournal';
import { BillingJournalService } from '../../services/billing-journal.service';
import { PaymentActivity } from '../../models/paymentActivity';
import { Attachment } from '../../models/attachment';

@Component({
  selector: 'app-billing-journal',
  templateUrl: './billing-journal.component.html',
  styleUrls: ['./billing-journal.component.css']
})
export class BillingJournalComponent implements OnInit {
  form: FormGroup;
  id: number;
  billingJournal$: Observable<BillingJournal>;
  action: string;

  displayedPaymentActivities: PaymentActivity[];  
  displayedAttachments: Attachment[];  
 // displayedInsuranceProviderBillingActivities: BillingActivity[];  

  constructor(private store: Store<reducer.BillingModuleState>, private fb: FormBuilder, private route: ActivatedRoute, 
    public billingActivtyService: BillingJournalService) { }

  ngOnInit() {
       
    let mode = this.route.snapshot.queryParamMap.get('mode');

    mode == 'update' ? this.update() : this.create();

    // this.form.patchValue(this.billingActivtyService.billingJournal);

    // this.billingActivtyService.billingJournal.paymentActivities.forEach(pe => {
    //   this.displayedPaymentActivities.push(pe);
    //   this.paymentActivities.push(this.fb.group(pe))
    // });

  }

  update(){
    this.action = 'Update';

    this.initialize();

    this.id = +this.route.snapshot.paramMap.get('id');
  
    let billingJournalSlice$ = this.store.select(reducer.selectCurrentBillingJournal);

    this.billingJournal$ = billingJournalSlice$.pipe(
      tap(billingJournal => {
//        this.initialize();
        this.form.patchValue(billingJournal);

        billingJournal.paymentActivities.forEach(pe => {
          this.displayedPaymentActivities.push(pe);
          this.paymentActivities.push(this.fb.group(pe))
        });

        billingJournal.attachments.forEach(at => {
          this.displayedAttachments.push(at);
          this.attachments.push(this.fb.group(at))
        });

      })
    );

    this.store.dispatch(new actions.BillingJournalGet(this.id));
  }

  create(){
    
    this.action = 'Create';

    this.initialize();

    this.billingJournal$ = of(<BillingJournal>{})

  }

  initialize(){

    //investigate the need for this
    this.displayedPaymentActivities = [];
    this.displayedAttachments = [];

    // this.displayedInsuranceProviderBillingActivities = [];
    
    //create the billing form
    this.form = this.fb.group({
      id: '',
      ledgerId: '',
      ledgerTypeId: '',
      dateBilled: '',
      amount: '',
      balance: '',
      statusId: '',
      billedEntityId: '',
      billedEntityTypeId: '',
      billedEntityName:'',
      contactActivities: this.fb.array([]),
      paymentActivities: this.fb.array([]),
      negotiationActivities: this.fb.array([]),
      attachments: this.fb.array([])
    });

  }

  get paymentActivities(){
    return this.form.get('paymentActivities') as FormArray;
  }

  get attachments(){
    return this.form.get('attachments') as FormArray;
  }

  // get insuranceProviderBillingActivities(){
  //   return this.form.get('insuranceProviderBillingActivities') as FormArray;
  // }


//   export interface BillingActivity {
//     id: number;
//     dateBilled: Date;
//     amount: number;
//     balance: number;
//     statusId: number;           //open, settled, collections, etc

//     billedItemId: number;       //examBillingId or lopCaseId since an LOP Case can be associated with multiple exams
//     billedItemTypeId: number;   //individual exam vs a bill tied to a lop which could be for a group of exams

//     billedEntityId: number;     //patientId, insuranceProviderId, lawfirmId, attorneyId
//     billedEntityTypeId: number; //patient, insurance provider, law firm, attorney
//     billedEntityName: string;

//     contactActivity: ContactActivity[];
//     paymentActivity: PaymentActivity[];
//     negotiationActivity: NegotiationActivity[];
// }

  // get data():string{
  //   return this.billingActivtyService.billingActivity.billedEntityName;
  // }

  onSubmit({ value, valid }) {

    // this.store.dispatch(new actions.BillingSave(<ExamBilling>{
    //   id: value.id, 
    //   patientName: value.patientName, 
    //   doctorName: value.doctorName, 
    //   patientId:  value.patientId, 
    //   exam: value.exam, 
    //   dateOfService: value.dateOfService, 
    //   statusId: value.statusId, 
    //   amount: value.amount
    // }));

  }

}