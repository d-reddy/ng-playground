import { ExamBillingLedger } from '../../models/examBillingLedger';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'

import * as reducer from '../../reducers'
import * as actions from '../../actions/billing.actions';
import { PageRequest, PageResponse } from '../../../shared/pagination/models/pagination';
import { map } from 'rxjs/operators';
import { BillingState } from '../../reducers/billing.reducer';

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.css']
})
export class BillingListComponent implements OnInit {
  page$: Observable<PageResponse<ExamBillingLedger>>;
  headerRow: string[]
  billings$: Observable<ExamBillingLedger[]>;

  constructor(private store: Store<BillingState>) { 
  }

  ngOnInit() {
    this.headerRow = ['patient name', 'medical number', 'date of service', 'exam'];

    this.page$ = this.store.select(reducer.selectCurrentBillingPage);
 
    this.billings$ = this.page$.pipe(
      map(x => x.results)
    );

    let pageRequest = <PageRequest>{
        pageIndex: 0,
        pageSize: 2
    }

    let filter = null;

    this.store.dispatch(new actions.BillingsGet(filter, pageRequest));
  }
  
  onPageChanged(pageIndex: number) {
    let pageRequest = <PageRequest>{
        pageIndex: pageIndex,
        pageSize: 2
    };
    
    let filter = null;

    this.store.dispatch(new actions.BillingsGet(filter, pageRequest));
  }
}