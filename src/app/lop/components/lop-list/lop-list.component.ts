import { Lop } from '../../models/lop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

import * as reducer from '../../reducers'
import * as actions from '../../actions/lop.actions';
import { PageRequest, PageResponse } from '../../../shared/pagination/models/pagination';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lop-list',
  templateUrl: './lop-list.component.html',
  styleUrls: ['./lop-list.component.css']
})
export class LopListComponent implements OnInit {
  page$: Observable<PageResponse<Lop>>;
  headerRow: string[]
  lops$: Observable<Lop[]>;

  constructor(private store: Store<reducer.LopsAggregateState>) { 
  }

  ngOnInit() {
    this.headerRow = ['first', 'last', 'city', 'state', 'phone', 'actions'];

    this.page$ = this.store.select(reducer.selectCurrentLopPage);
 
    this.lops$ = this.page$.pipe(
      map(x => x.results)
    );

    let pageRequest = <PageRequest>{
        pageIndex: 0,
        pageSize: 2
    }

    let filter = null;

    this.store.dispatch(new actions.LopsGet(filter, pageRequest));
  }
  
  onPageChanged(pageIndex: number) {
    let pageRequest = <PageRequest>{
        pageIndex: pageIndex,
        pageSize: 2
    };
    
    let filter = null;

    this.store.dispatch(new actions.LopsGet(filter, pageRequest));
  }
}