import { Patient } from '../models/patient';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

//import * as reducer from '../reducers/patient.reducer';
import * as reducer from '../reducers/index'

@Component({
  selector: 'patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['./patient-grid.component.css']
})
export class PatientGridComponent implements OnInit {
  patients$:Observable<Patient[]>;
  title:string ='Patients Added';

  constructor(private store: Store<reducer.PatientAggregateState>) { 
  }

  ngOnInit() {
    this.patients$ = this.store.select(reducer.selectAllPatients);  
  }

}