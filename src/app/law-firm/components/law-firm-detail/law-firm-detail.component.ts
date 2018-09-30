import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { LawFirm } from '../../models/lawFirm';
import { Address } from '../../models/address';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators';

import * as reducer from '../../reducers';
import * as actions from '../../actions/law-firm.actions';

@Component({
  selector: 'app-law-firm',
  templateUrl: './law-firm-detail.component.html',
  styleUrls: ['./law-firm-detail.component.css']
})
export class LawFirmDetailComponent implements OnInit {
  lawFirmForm: FormGroup;
  id: number;
  lawFirm$: Observable<LawFirm>;
  action: string;
  
  constructor(private store: Store<reducer.LawFirmModuleState>, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {

    this.initialize();

    let mode = this.route.snapshot.queryParamMap.get('mode');

    mode == 'update' ? this.update() : this.create();

  }

  initialize(){

    //create the lawFirm form
    this.lawFirmForm = this.fb.group({
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
  
    let lawFirmSlice$ = this.store.select(reducer.selectCurrentLawFirm);

    this.lawFirm$ = lawFirmSlice$.pipe(
      tap(lawFirm => {
        this.initialize();
        this.lawFirmForm.patchValue(lawFirm);
      })
    );

    this.store.dispatch(new actions.LawFirmGet(this.id));

  }

  create(){
    
    this.action = 'Create';

    this.lawFirm$ = of(<LawFirm>{})

  }

  onSubmit({ value, valid }) {

    this.store.dispatch(new actions.LawFirmSave(<LawFirm>{
      id: value.id, 
      name: value.name, 
      phone: value.phone, 
      fax: value.fax, 
      email: value.email, 
      notes: value.notes,
      currentAddress: <Address> {
        address: value.currentAddress.address,
        city: value.currentAddress.city,
        state: value.currentAddress.state,
        zip: value.currentAddress.zip
      }
    }));
  }

}