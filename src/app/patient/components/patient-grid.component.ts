// patient.component.ts
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { Patient } from '../models/patient';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

import * as reducer from '../reducers/patient.reducer';

@Component({
  selector: 'patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['./patient-grid.component.css']
})
export class PatientGridComponent implements OnInit {
  patients$ = [{'name': 'blah', 'dob':'dah' }, {'name': 'donk', 'dob':'dink' }];//Observable<any>;
   
  title:string ='Patients Added'

  constructor(private store: Store<reducer.PatientState>) { 
//    this.patients$ = this.store.select(reducer.selectEntities);
  }

  ngOnInit() {
  }

}