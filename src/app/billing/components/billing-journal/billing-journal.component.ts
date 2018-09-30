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

  constructor(private store: Store<reducer.BillingModuleState>, private fb: FormBuilder, private route: ActivatedRoute, 
    public billingActivtyService: BillingJournalService) { }

  ngOnInit() {
    
    this.initialize();

    let mode = this.route.snapshot.queryParamMap.get('mode');

    mode == 'update' ? this.update() : this.create();

  }

  update(){

    this.action = 'Update';

    this.id = +this.route.snapshot.paramMap.get('id');
  
    let billingJournalSlice$ = this.store.select(reducer.selectCurrentBillingJournal);

    this.billingJournal$ = billingJournalSlice$.pipe(
      tap(billingJournal => {
        this.initialize();

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

    this.billingJournal$ = of(<BillingJournal>{})

  }

  initialize(){

    this.displayedPaymentActivities = [];
    this.displayedAttachments = [];

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


  onSubmit({ value, valid }) {

  }

}