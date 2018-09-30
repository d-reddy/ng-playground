import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { InsuranceProvider } from '../../models/insuranceProvider';
import { Address } from '../../models/address';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators';

import * as reducer from '../../reducers';
import * as actions from '../../actions/insurance-provider.actions';

@Component({
  selector: 'app-insurance-provider',
  templateUrl: './insurance-provider-detail.component.html',
  styleUrls: ['./insurance-provider-detail.component.css']
})
export class InsuranceProviderDetailComponent implements OnInit {
  insuranceProviderForm: FormGroup;
  id: number;
  insuranceProvider$: Observable<InsuranceProvider>;
  action: string;
  
  constructor(private store: Store<reducer.InsuranceProviderModuleState>, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {

    this.initialize();
   
    let mode = this.route.snapshot.queryParamMap.get('mode');

    mode == 'update' ? this.update() : this.create();

  }

  initialize(){

    //create the insuranceProvider form
    this.insuranceProviderForm = this.fb.group({
      id: '',
      name: '',
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
  
    let insuranceProviderSlice$ = this.store.select(reducer.selectCurrentInsuranceProvider);

    this.insuranceProvider$ = insuranceProviderSlice$.pipe(
      tap(insuranceProvider => {
        this.initialize();
        this.insuranceProviderForm.patchValue(insuranceProvider);
      })
    );

    this.store.dispatch(new actions.InsuranceProviderGet(this.id));

  }

  create(){
    
    this.action = 'Create';

    this.insuranceProvider$ = of(<InsuranceProvider>{})

  }

  onSubmit({ value, valid }) {

    this.store.dispatch(new actions.InsuranceProviderSave(<InsuranceProvider>{
      id: value.id, 
      name: value.name, 
      phone: value.phone, 
      fax: value.fax, 
      email: value.email, 
      notes: value.notes,
      currentAddress: <Address>{
        address: value.currentAddress.address,
        city: value.currentAddress.city,
        state: value.currentAddress.state,
        zip: value.currentAddress.zip
      }
    }));

  }

}