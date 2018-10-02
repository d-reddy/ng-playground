import { Attorney } from '../../models/attorney';
import { Filter } from '../../models/filter';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs'
import * as reducer from '../../reducers'
import * as actions from '../../actions/attorney.actions';
import { PageRequest, PageResponse } from '../../../shared/pagination/models/pagination';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-attorney-list',
  templateUrl: './attorney-list.component.html',
  styleUrls: ['./attorney-list.component.css']
})
export class AttorneyListComponent implements OnInit, OnDestroy {
  page$: Observable<PageResponse<Attorney>>;
  headerRow: string[]
  attorneys$: Observable<Attorney[]>;
  searchTerm$ = new Subject<string>();
  filter: Filter;
  pageRequest: PageRequest;
  searchTermSubscription: Subscription;

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

    //set default filter
    this.filter = <Filter>{
      firstName: null,
      lastName: null
    };

    //set default page size
    this.pageRequest =  <PageRequest>{
      pageIndex: 0,
      //i know, too small, just for testing paging functionality
      pageSize: 2
    };

    //wire up search field:
    // 1) registers listener to search term Subject
    // 2) waits 2 seconds so we're not hitting server too frequently
    // 3) distinctuntilchanged = don't fire if last value is same as current
    // 4) subscribe to events, when triggered setup filter, kick off search
    this.searchTermSubscription = this.searchTerm$.pipe(debounceTime(2000),
      distinctUntilChanged()).
      subscribe(term => {
        this.filter.firstName = term;
        this.filter.lastName = term;
        //reset the page index when filter value changes
        this.pageRequest.pageIndex = 0;
        this.search();
      });
  
    //dispatch request to fetch a page of attorneys
    this.search();
  }
  
  /**
   * This method is called when a page request is made.
   * 
   * @param pageIndex the page index requested
   */
  onPageChanged(pageIndex: number) {
    this.pageRequest.pageIndex = pageIndex;
    this.search();
  }

  search(){
    //dispatch request to fetch a page of attorneys
    this.store.dispatch(new actions.AttorneysGet(this.filter, this.pageRequest));
  }

  ngOnDestroy(){
    this.searchTermSubscription.unsubscribe();
  }

}