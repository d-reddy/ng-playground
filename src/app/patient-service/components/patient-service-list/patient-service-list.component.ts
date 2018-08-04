import { PatientService } from '../../models/patientService';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, Subscription } from 'rxjs'
import { ActivatedRoute, ParamMap } from '@angular/router';

import * as reducer from '../../reducers'
import * as actions from '../../actions/patient-service.actions';
import { PageRequest, PageResponse } from '../../../shared/pagination/models/pagination';

@Component({
  selector: 'patient-service-list',
  templateUrl: './patient-service-list.component.html',
  styleUrls: ['./patient-service-list.component.css']
})
export class PatientServiceListComponent implements OnInit {
  //page$: Observable<PageResponse<PatientService>> | null
  patientServicesSubscription: Subscription;
  patientServices: PatientService[];
  page: Observable<PageResponse<PatientService>>;
  headerRow: string[]

  constructor(private store: Store<reducer.PatientServicesAggregateState>) { 
  }

  ngOnInit() {
    this.headerRow = ['medical record number', 'date of service'];
    this.page = this.store.select(reducer.selectCurrentPatientServicePage);
 
    this.patientServicesSubscription = this.page.subscribe(data => {
      if(data){
        this.patientServices = data.results;
      }
    });

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

  ngOnDestroy(){
    this.patientServicesSubscription.unsubscribe();
  }
}