import { FormGroup, FormArray, FormBuilder,  Validators } from '@angular/forms';

import { ExamBillingLedger } from '../../models/examBillingLedger';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators';

import * as reducer from '../../reducers';
import * as actions from '../../actions/billing.actions';
import { BillingJournal } from '../../models/billingJournal';
import { BillingJournalService } from '../../services/billing-journal.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing-detail.component.html',
  styleUrls: ['./billing-detail.component.css']
})
export class BillingDetailComponent implements OnInit {
  form: FormGroup;
  id: number;
  billing$: Observable<ExamBillingLedger>;
  action: string;

  displayedPatientBillingJournals: BillingJournal[];  
  displayedInsuranceProviderBillingJournals: BillingJournal[];  

  constructor(private store: Store<reducer.BillingModuleState>, private fb: FormBuilder, private route: ActivatedRoute, public billingActivtyService: BillingJournalService, private router: Router) { }

  ngOnInit() {

    this.initialize();

    let mode = this.route.snapshot.queryParamMap.get('mode');

    mode == 'update' ? this.update() : this.create();
    
  }

  initialize(){

    this.displayedPatientBillingJournals = [];
    this.displayedInsuranceProviderBillingJournals = [];

    //create the billing form
    this.form = this.fb.group({
      id: '',
      patientServiceId: '',
      patientName: '',
      patientId: '',
      doctorName: '',
      doctorId: '',
      examId: '',
      exam: '',
      dateOfService: '',
      statusId:'',
      amount:'',
      patientBillingJournals: this.fb.array([]),
      insuranceProviderBillingJournals: this.fb.array([])
    });

  }

  update(){

    this.action = 'Update';

    this.id = +this.route.snapshot.paramMap.get('id');
  
    let billingSlice$ = this.store.select(reducer.selectCurrentBilling);

    this.billing$ = billingSlice$.pipe(
      tap(billing => {
        this.form.patchValue(billing);

        billing.patientBillingJournals.forEach(pe => {
          this.displayedPatientBillingJournals.push(pe);
          this.patientBillingJournals.push(this.fb.group(pe))
        });

        billing.insuranceBillingJournals.forEach(pe => {
          this.displayedInsuranceProviderBillingJournals.push(pe);
          this.insuranceProviderBillingJournals.push(this.fb.group(pe))
        });
      })
    );

    this.store.dispatch(new actions.BillingGet(this.id));
  }

  create(){
    
    this.action = 'Create';

    this.billing$ = of(<ExamBillingLedger>{})

  }

  onSubmit({ value, valid }) {

    this.store.dispatch(new actions.BillingSave(<ExamBillingLedger>{
      id: value.id, 
      patientName: value.patientName, 
      doctorName: value.doctorName, 
      patientId:  value.patientId, 
      exam: value.exam, 
      dateOfService: value.dateOfService, 
      statusId: value.statusId, 
      amount: value.amount
    }));

  }

  get patientBillingJournals(){
    return this.form.get('patientBillingJournals') as FormArray;
  }

  get insuranceProviderBillingJournals(){
    return this.form.get('insuranceProviderBillingJournals') as FormArray;
  }

}