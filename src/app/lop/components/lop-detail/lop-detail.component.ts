import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { Lop } from '../../models/lop';
import { Address } from '../../models/address';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators';

import * as reducer from '../../reducers';
import * as actions from '../../actions/lop.actions';

@Component({
  selector: 'app-lop',
  templateUrl: './lop-detail.component.html',
  styleUrls: ['./lop-detail.component.css']
})
export class LopDetailComponent implements OnInit {
  lopForm: FormGroup;
  id: number;
  lop$: Observable<Lop>;
  action: string;
  
  constructor(private store: Store<reducer.LopsAggregateState>, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    //create the lop form
    this.lopForm = this.fb.group({
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
      phone: '',
      fax: '',
      email:'',
      notes:'',
      currentAddress: this.fb.group({
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
  
    let lopSlice$ = this.store.select(reducer.selectCurrentLop);

    this.lop$ = lopSlice$.pipe(
      tap(lop => {
        this.lopForm.patchValue(lop);
      })
    );

    this.store.dispatch(new actions.LopGet(this.id));

  }

  create(){
    
    this.action = 'Create';

    this.lop$ = of(<Lop>{})

  }

  onSubmit({ value, valid }) {

    this.store.dispatch(new actions.LopSave(<Lop>{
      id: value.id, 
      firstName: value.firstName, 
      middleName: value.middleName, 
      lastName:  value.lastName, 
      phone: value.phone, 
      fax: value.fax, 
      email: value.email, 
      notes: value.notes,
      currentAddress: {
        address: value.currentAddress.address,
        city: value.currentAddress.city,
        state: value.currentAddress.state,
        zip: value.currentAddress.zip
      },
      lawFirmId: value.lawFirmId
    }));
  }

}