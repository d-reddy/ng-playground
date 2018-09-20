import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { Attorney } from '../../models/attorney';
import { Address } from '../../models/address';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators';

import * as reducer from '../../reducers';
import * as actions from '../../actions/attorney.actions';

@Component({
  selector: 'app-attorney',
  templateUrl: './attorney-detail.component.html',
  styleUrls: ['./attorney-detail.component.css']
})
export class AttorneyDetailComponent implements OnInit {
  attorneyForm: FormGroup;
  id: number;
  attorney$: Observable<Attorney>;
  action: string;
  
  constructor(private store: Store<reducer.AttorneysAggregateState>, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    
    //create the attorney form
    this.attorneyForm = this.fb.group({
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
    
    let mode = this.route.snapshot.queryParamMap.get('mode');

    mode == 'update' ? this.update() : this.create();

  }

  update(){

    this.action = 'Update';

    this.id = +this.route.snapshot.paramMap.get('id');

    let attorneySlice$ = this.store.select(reducer.selectCurrentAttorney);

    this.attorney$ = attorneySlice$.pipe(
      tap(attorney => {
        this.attorneyForm.patchValue(attorney);
      })
    );

    this.store.dispatch(new actions.AttorneyGet(this.id));

  }

  create(){
    
    this.action = 'Create';

    this.attorney$ = of(<Attorney>{})

  }

  onSubmit({ value, valid }) {

    this.store.dispatch(new actions.AttorneySave(<Attorney>{
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
      lawFirmId: value.lawFirmId
    }));
    
  }

}