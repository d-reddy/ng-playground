import { Patient } from '../../models/patient';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

import * as reducer from '../../reducers'

@Component({
  selector: 'patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients$:Observable<Patient[]>;
  title:string ='Patients Added';

  constructor(private store: Store<reducer.PatientAggregateState>) { 
  }

  ngOnInit() {
    this.patients$ = this.store.select(reducer.selectAllPatients);  
  }

}