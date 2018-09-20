import { Attorney } from '../../models/attorney';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

import * as reducer from '../../reducers'
import * as actions from '../../actions/attorney.actions';
import { PageRequest, PageResponse } from '../../../shared/pagination/models/pagination';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-attorney-list',
  templateUrl: './attorney-list.component.html',
  styleUrls: ['./attorney-list.component.css']
})
export class AttorneyListComponent implements OnInit {
  page$: Observable<PageResponse<Attorney>>;
  headerRow: string[]
  attorneys$: Observable<Attorney[]>;

  constructor(private store: Store<reducer.AttorneysAggregateState>) { 
  }

  ngOnInit() {
    this.headerRow = ['first', 'last', 'city', 'state', 'phone', 'actions'];

    this.page$ = this.store.select(reducer.selectCurrentAttorneyPage);
 
    this.attorneys$ = this.page$.pipe(
      map(x => x.results)
    );

    let pageRequest = <PageRequest>{
        pageIndex: 0,
        pageSize: 2
    }

    let filter = null;

    this.store.dispatch(new actions.AttorneysGet(filter, pageRequest));
  }
  
  onPageChanged(pageIndex: number) {
    let pageRequest = <PageRequest>{
        pageIndex: pageIndex,
        pageSize: 2
    };
    
    let filter = null;

    this.store.dispatch(new actions.AttorneysGet(filter, pageRequest));
  }
}