import { Patient } from '../../models/patient';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

import * as reducer from '../../reducers'
import * as actions from '../../actions/patient.actions';
import { PageRequest, PageResponse } from '../../../shared/pagination/models/pagination';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  page$: Observable<PageResponse<Patient>>;
  headerRow: string[]
  patients$: Observable<Patient[]>;

  constructor(private store: Store<reducer.PatientsModuleState>) { 
  }

  ngOnInit() {
    this.page$ = this.store.select(reducer.selectCurrentPatientPage);
 
    this.patients$ = this.page$.pipe(
      map(x => x.results)
    );

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
}