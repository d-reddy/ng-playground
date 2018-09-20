import { InsuranceProvider } from '../../models/insuranceProvider';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

import * as reducer from '../../reducers'
import * as actions from '../../actions/insurance-provider.actions';
import { PageRequest, PageResponse } from '../../../shared/pagination/models/pagination';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-insurance-provider-list',
  templateUrl: './insurance-provider-list.component.html',
  styleUrls: ['./insurance-provider-list.component.css']
})
export class InsuranceProviderListComponent implements OnInit {
  page$: Observable<PageResponse<InsuranceProvider>>;
  headerRow: string[]
  insuranceProviders$: Observable<InsuranceProvider[]>;

  constructor(private store: Store<reducer.InsuranceProvidersAggregateState>) { 
  }

  ngOnInit() {
    this.headerRow = ['name', 'city', 'state', 'phone', 'actions'];

    this.page$ = this.store.select(reducer.selectCurrentInsuranceProviderPage);
 
    this.insuranceProviders$ = this.page$.pipe(
      map(x => x.results)
    );

    let pageRequest = <PageRequest>{
        pageIndex: 0,
        pageSize: 2
    }

    let filter = null;

    this.store.dispatch(new actions.InsuranceProvidersGet(filter, pageRequest));
  }
  
  onPageChanged(pageIndex: number) {
    let pageRequest = <PageRequest>{
        pageIndex: pageIndex,
        pageSize: 2
    };
    
    let filter = null;

    this.store.dispatch(new actions.InsuranceProvidersGet(filter, pageRequest));
  }
}