import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { Billing } from '../../models/billing';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators';

import * as reducer from '../../reducers';
import * as actions from '../../actions/billing.actions';

@Component({
  selector: 'app-billing',
  templateUrl: './billing-detail.component.html',
  styleUrls: ['./billing-detail.component.css']
})
export class BillingDetailComponent implements OnInit {
  billingForm: FormGroup;
  id: number;
  billing$: Observable<Billing>;
  action: string;
  
  constructor(private store: Store<reducer.BillingsAggregateState>, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    
    //create the billing form
    this.billingForm = this.fb.group({
      id: '',
      patientName: '',
      doctorName: '',
      patientId: '',
      exam: '',
      dateOfService: '',
      statusId:'',
      amount:''
    });
    
    let mode = this.route.snapshot.queryParamMap.get('mode');

    mode == 'update' ? this.update() : this.create();

  }

  update(){

    this.action = 'Update';

    this.id = +this.route.snapshot.paramMap.get('id');
  
    let billingSlice$ = this.store.select(reducer.selectCurrentBilling);

    this.billing$ = billingSlice$.pipe(
      tap(billing => {
        this.billingForm.patchValue(billing);
      })
    );

    this.store.dispatch(new actions.BillingGet(this.id));
  }

  create(){
    
    this.action = 'Create';

    this.billing$ = of(<Billing>{})

  }

  onSubmit({ value, valid }) {

    this.store.dispatch(new actions.BillingSave(<Billing>{
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

}