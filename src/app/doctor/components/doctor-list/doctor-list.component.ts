import { Doctor } from '../../models/doctor';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, Subscription } from 'rxjs'
import { ActivatedRoute, ParamMap } from '@angular/router';

import * as reducer from '../../reducers'
import * as actions from '../../actions/doctor.actions';
import { PageRequest, PageResponse } from '../../../shared/pagination/models/pagination';

@Component({
  selector: 'doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  //page$: Observable<PageResponse<Doctor>> | null
  doctorsSubscription: Subscription;
  doctors: Doctor[];
  page: Observable<PageResponse<Doctor>>;
  headerRow: string[]

  constructor(private store: Store<reducer.DoctorsAggregateState>) { 
  }

  ngOnInit() {
    this.headerRow = ['first', 'last', 'phone', 'email'];
    this.page = this.store.select(reducer.selectCurrentDoctorPage);
 
    this.doctorsSubscription = this.page.subscribe(data => {
      if(data){
        this.doctors = data.results;
      }
    });

    let pageRequest = <PageRequest>{
        pageIndex: 0,
        pageSize: 2
    }

    let filter = null;

    this.store.dispatch(new actions.DoctorsGet(filter, pageRequest));
  }
  
  onPageChanged(pageIndex: number) {
    let pageRequest = <PageRequest>{
        pageIndex: pageIndex,
        pageSize: 2
    };
    
    let filter = null;

    this.store.dispatch(new actions.DoctorsGet(filter, pageRequest));
  }

  ngOnDestroy(){
    this.doctorsSubscription.unsubscribe();
  }
}