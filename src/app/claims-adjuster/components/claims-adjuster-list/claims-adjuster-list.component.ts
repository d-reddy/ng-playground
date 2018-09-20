import { ClaimsAdjuster } from '../../models/claimsAdjuster';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

import * as reducer from '../../reducers'
import * as actions from '../../actions/claims-adjuster.actions';
import { PageRequest, PageResponse } from '../../../shared/pagination/models/pagination';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-claims-adjuster-list',
  templateUrl: './claims-adjuster-list.component.html',
  styleUrls: ['./claims-adjuster-list.component.css']
})
export class ClaimsAdjusterListComponent implements OnInit {
  page$: Observable<PageResponse<ClaimsAdjuster>>;
  headerRow: string[]
  claimsAdjusters$: Observable<ClaimsAdjuster[]>;

  constructor(private store: Store<reducer.ClaimsAdjustersAggregateState>) { 
  }

  ngOnInit() {
    this.headerRow = ['first', 'last', 'city', 'state', 'phone', 'actions'];

    this.page$ = this.store.select(reducer.selectCurrentClaimsAdjusterPage);
 
    this.claimsAdjusters$ = this.page$.pipe(
      map(x => x.results)
    );

    let pageRequest = <PageRequest>{
        pageIndex: 0,
        pageSize: 2
    }

    let filter = null;

    this.store.dispatch(new actions.ClaimsAdjustersGet(filter, pageRequest));
  }
  
  onPageChanged(pageIndex: number) {
    let pageRequest = <PageRequest>{
        pageIndex: pageIndex,
        pageSize: 2
    };
    
    let filter = null;

    this.store.dispatch(new actions.ClaimsAdjustersGet(filter, pageRequest));
  }
}