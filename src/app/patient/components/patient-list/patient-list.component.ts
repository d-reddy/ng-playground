import { Patient } from '../../models/patient';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs'
import { ActivatedRoute, ParamMap } from '@angular/router';

import * as reducer from '../../reducers'
import * as actions from '../../actions/patient.actions';

declare interface TableData {
  headerRow: string[];
  patients$: Observable<Patient[]>;
}

@Component({
  selector: 'patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  tableData: TableData;

  constructor(private store: Store<reducer.PatientAggregateState>) { 
    this.tableData = {
      headerRow: ['medical#', 'name', 'dob', 'actions'],
      patients$: of([]) //initialize to empty array
    }
  }

  ngOnInit() {
    this.tableData.patients$ = this.store.select(reducer.selectAllPatients);
    this.store.dispatch(new actions.PatientsGet(/*support filter at some point*/));
  }
  
}