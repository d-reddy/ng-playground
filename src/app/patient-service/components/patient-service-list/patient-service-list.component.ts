import { PatientService } from '../../models/patientService';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

import * as reducer from '../../reducers'
import * as actions from '../../actions/patient-service.actions';
import { PageRequest, PageResponse } from '../../../shared/pagination/models/pagination';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-patient-service-list',
  templateUrl: './patient-service-list.component.html',
  styleUrls: ['./patient-service-list.component.css']
})
export class PatientServiceListComponent implements OnInit {
  page$: Observable<PageResponse<PatientService>>;
  headerRow: string[]
  patientServices$: Observable<PatientService[]>;

  constructor(private store: Store<reducer.PatientServicesAggregateState>) { 
  }

  ngOnInit() {
    this.headerRow = ['medical record number', 'date of service'];
    this.page$ = this.store.select(reducer.selectCurrentPatientServicePage);
 
    this.patientServices$ = this.page$.pipe(
      map(x => x.results)
    );

    let pageRequest = <PageRequest>{
        pageIndex: 0,
        pageSize: 2
    }

    let filter = null;

    this.store.dispatch(new actions.PatientServicesGet(filter, pageRequest));
  }
  
  onPageChanged(pageIndex: number) {
    let pageRequest = <PageRequest>{
        pageIndex: pageIndex,
        pageSize: 2
    };
    
    let filter = null;

    this.store.dispatch(new actions.PatientServicesGet(filter, pageRequest));
  }

}