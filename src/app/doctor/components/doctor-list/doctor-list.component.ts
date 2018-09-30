import { Doctor } from '../../models/doctor';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

import * as reducer from '../../reducers'
import * as actions from '../../actions/doctor.actions';
import { PageRequest, PageResponse } from '../../../shared/pagination/models/pagination';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctors$: Observable<Doctor[]>;
  page$: Observable<PageResponse<Doctor>>;
  headerRow: string[]

  constructor(private store: Store<reducer.DoctorModuleState>) { 
  }

  ngOnInit() {
    this.page$ = this.store.select(reducer.selectCurrentDoctorPage);

    this.doctors$ = this.page$.pipe(
      map(x => x.results)
    );

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
}