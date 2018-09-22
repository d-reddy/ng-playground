import { FormGroup, FormArray, FormBuilder,  Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators';

import * as reducer from '../../reducers';
import * as actions from '../../actions/billing.actions';
import { BillingJournal } from '../../models/billingJournal';
import { BillingActivityService } from '../../services/billing-activity.service';
import { PaymentActivity } from '../../models/paymentActivity';

@Component({
  selector: 'app-billing-journal',
  templateUrl: './billing-journal.component.html',
  styleUrls: ['./billing-journal.component.css']
})
export class BillingJournalComponent implements OnInit {
  form: FormGroup;
  id: number;
//  billingActivity$: Observable<BillingActivity>;
  action: string;
//  billingActivity$: BillingActivity;

  displayedPaymentActivities: PaymentActivity[];  
 // displayedInsuranceProviderBillingActivities: BillingActivity[];  

  constructor(private store: Store<reducer.BillingsAggregateState>, private fb: FormBuilder, private route: ActivatedRoute, 
    public billingActivtyService: BillingActivityService) { }

  ngOnInit() {
       
    let mode = this.route.snapshot.queryParamMap.get('mode');

    mode == 'update' ? this.update() : this.create();

    this.initialize();

    this.form.patchValue(this.billingActivtyService.billingActivity);

    this.billingActivtyService.billingActivity.paymentActivities.forEach(pe => {
      this.displayedPaymentActivities.push(pe);
      this.paymentActivities.push(this.fb.group(pe))
    });

  }

  update(){

    // this.action = 'Update';

    // this.id = +this.route.snapshot.paramMap.get('id');
  
    // let billingSlice$ = this.store.select(reducer.selectCurrentBilling);

    // this.billing$ = billingSlice$.pipe(
    //   tap(billing => {
    //     this.initialize();
    //     this.form.patchValue(billing);

    //     billing.patientBillingActivities.forEach(pe => {
    //       this.displayedPatientBillingActivities.push(pe);
    //       this.patientBillingActivities.push(this.fb.group(pe))
    //     });

    //     billing.insuranceBillingActivities.forEach(pe => {
    //       this.displayedInsuranceProviderBillingActivities.push(pe);
    //       this.insuranceProviderBillingActivities.push(this.fb.group(pe))
    //     });
    //   })
    // );

    // this.store.dispatch(new actions.BillingGet(this.id));
  }

  create(){
    
    // this.action = 'Create';

    // this.initialize();

    // this.billing$ = of(<ExamBilling>{})

  }

  initialize(){

    //investigate the need for this
    this.displayedPaymentActivities = [];
    // this.displayedInsuranceProviderBillingActivities = [];
    
    //create the billing form
    this.form = this.fb.group({
      id: '',
      dateBilled: '',
      amount: '',
      balance: '',
      statusId: '',
      billedItemId: '',
      billedItemTypeId: '',
      billedEntityId: '',
      billedEntityTypeId: '',
      billedEntityName:'',
      contactActivities: this.fb.array([]),
      paymentActivities: this.fb.array([]),
      negotiationActivities: this.fb.array([])
    });

  }

  get paymentActivities(){
    return this.form.get('paymentActivities') as FormArray;
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