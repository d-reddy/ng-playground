import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { ClaimsAdjuster } from '../../models/claimsAdjuster';
import { Address } from '../../models/address';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators';

import * as reducer from '../../reducers';
import * as actions from '../../actions/claims-adjuster.actions';

@Component({
  selector: 'app-claims-adjuster',
  templateUrl: './claims-adjuster-detail.component.html',
  styleUrls: ['./claims-adjuster-detail.component.css']
})
export class ClaimsAdjusterDetailComponent implements OnInit {
  claimsAdjusterForm: FormGroup;
  id: number;
  claimsAdjuster$: Observable<ClaimsAdjuster>;
  action: string;
  
  constructor(private store: Store<reducer.ClaimsAdjustersModuleState>, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {

    this.initialize();
    
    let mode = this.route.snapshot.queryParamMap.get('mode');

    mode == 'update' ? this.update() : this.create();

  }

  initialize(){

    //create the claimsAdjuster form
    this.claimsAdjusterForm = this.fb.group({
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
      phone: '',
      fax: '',
      email:'',
      notes:'',
      currentAddress: this.fb.group(<Address>{
        address:'',
        city:'',
        state:'',
        zip:''
      })
    });

  }

  update(){

    this.action = 'Update';

    this.id = +this.route.snapshot.paramMap.get('id');
  
    let claimsAdjusterSlice$ = this.store.select(reducer.selectCurrentClaimsAdjuster);

    this.claimsAdjuster$ = claimsAdjusterSlice$.pipe(
      tap(claimsAdjuster => {
        this.initialize();
        this.claimsAdjusterForm.patchValue(claimsAdjuster);
      })
    );

    this.store.dispatch(new actions.ClaimsAdjusterGet(this.id));

  }

  create(){
    
    this.action = 'Create';

    this.claimsAdjuster$ = of(<ClaimsAdjuster>{})

  }

  onSubmit({ value, valid }) {

    this.store.dispatch(new actions.ClaimsAdjusterSave(<ClaimsAdjuster>{
      id: value.id, 
      firstName: value.firstName, 
      middleName: value.middleName, 
      lastName:  value.lastName, 
      phone: value.phone, 
      fax: value.fax, 
      email: value.email, 
      notes: value.notes,
      currentAddress: <Address>{
        address: value.currentAddress.address,
        city: value.currentAddress.city,
        state: value.currentAddress.state,
        zip: value.currentAddress.zip
      },
      insuranceProviderIds: value.insuranceProviderIds
    }));

  }

}