import { Patient } from '../../models/patient';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, Subscription } from 'rxjs'
import { ActivatedRoute, ParamMap } from '@angular/router';

import * as reducer from '../../reducers'
import * as actions from '../../actions/patient.actions';
import { PageRequest, PageResponse } from '../../../shared/pagination/models/pagination';

@Component({
  selector: 'patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  //page$: Observable<PageResponse<Patient>> | null
  patientsSubscription: Subscription;
  patients: Patient[];
  page: Observable<PageResponse<Patient>>;
  headerRow: string[]

  constructor(private store: Store<reducer.PatientsAggregateState>) { 
  }

  ngOnInit() {
    this.headerRow = ['medical record number', 'first', 'last', 'dob', 'actions'];

    //this.tableData.patients$ = this.store.select(reducer.selectAllPatients);
    this.page = this.store.select(reducer.selectCurrentPatientPage);
 
    this.patientsSubscription = this.page.subscribe(data => {
      if(data){
        this.patients = data.results;
      }
    });

    let pageRequest = <PageRequest>{
        pageIndex: 0,
        pageSize: 2
    }

    let filter = null;

    this.store.dispatch(new actions.PatientsGet(filter, pageRequest));
  }
  
  onPageChanged(pageIndex: number) {
    let pageRequest = <PageRequest>{
        pageIndex: pageIndex,
        pageSize: 2
    };
    
    let filter = null;

    this.store.dispatch(new actions.PatientsGet(filter, pageRequest));
  }

  ngOnDestroy(){
    this.patientsSubscription.unsubscribe();
  }
}