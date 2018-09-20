import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromBilling from './billing.reducer';

/**
 * from what i understand, an index like this is used to aggregate reducers
 * and help to generate selectors across reducers, if multiple
 */

export interface BillingsAggregateState {
    billingsState: fromBilling.BillingsState,
    //other type of billing "state" ...ie AddressHistory???
}

//billing selectors  
export const billingsState = createFeatureSelector<fromBilling.BillingsState>('billings');

export const selectCurrentBillingId = createSelector(
  billingsState,  
  (state: fromBilling.BillingsState) => state.selectedBillingId
);

export const selectCurrentBillingPage = createSelector(
  billingsState,  
  (state: fromBilling.BillingsState) => state.selectedBillingPage
);

export const selectAllBillings = createSelector(billingsState, fromBilling.selectAll);

//get selected billing
export const selectCurrentBilling = createSelector(
  selectAllBillings,
  selectCurrentBillingId,
  (billings, selectedBillingId) => billings.find(billing => billing.id === selectedBillingId)
);

