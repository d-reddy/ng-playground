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

  constructor(private store: Store<reducer.AttorneyModuleState>) { 
  }

  ngOnInit() {

    //select a piece of the store to start listenting to, specifically
    //... the current page of attorneys we are on.
    this.page$ = this.store.select(reducer.selectCurrentAttorneyPage);
 
    this.attorneys$ = this.page$.pipe(
      //when the current selected page changes, apply the results
      map(x => x.results)
    );

    //build an initial page request
    let pageRequest = <PageRequest>{
        pageIndex: 0,
        //i know, too small, just for testing paging functionality
        pageSize: 2
    }

    let filter = null;

    //dispatch request to fetch a page of attorneys
    this.store.dispatch(new actions.AttorneysGet(filter, pageRequest));
  }
  
  /**
   * This method is called when a page request is made.
   * 
   * @param pageIndex the page index requested
   */
  onPageChanged(pageIndex: number) {
    let pageRequest = <PageRequest>{
        pageIndex: pageIndex,
        pageSize: 2
    };
    
    //eventually need to build out filter logic somewhere
    let filter = null;

    //dispatch request to fetch a page of attorneys
    this.store.dispatch(new actions.AttorneysGet(filter, pageRequest));
  }
}