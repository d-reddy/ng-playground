import { LawFirm } from '../../models/lawFirm';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

import * as reducer from '../../reducers'
import * as actions from '../../actions/law-firm.actions';
import { PageRequest, PageResponse } from '../../../shared/pagination/models/pagination';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-law-firm-list',
  templateUrl: './law-firm-list.component.html',
  styleUrls: ['./law-firm-list.component.css']
})
export class LawFirmListComponent implements OnInit {
  page$: Observable<PageResponse<LawFirm>>;
  headerRow: string[]
  lawFirms$: Observable<LawFirm[]>;

  constructor(private store: Store<reducer.LawFirmsAggregateState>) { 
  }

  ngOnInit() {
    this.headerRow = ['name', 'city', 'state', 'phone', 'actions'];

    this.page$ = this.store.select(reducer.selectCurrentLawFirmPage);
 
    this.lawFirms$ = this.page$.pipe(
      map(x => x.results)
    );

    let pageRequest = <PageRequest>{
        pageIndex: 0,
        pageSize: 2
    }

    let filter = null;

    this.store.dispatch(new actions.LawFirmsGet(filter, pageRequest));
  }
  
  onPageChanged(pageIndex: number) {
    let pageRequest = <PageRequest>{
        pageIndex: pageIndex,
        pageSize: 2
    };
    
    let filter = null;

    this.store.dispatch(new actions.LawFirmsGet(filter, pageRequest));
  }
}