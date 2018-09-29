import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromBilling from './billing.reducer';
import * as fromBillingJournal from './billing-journal.reducer';

/**
 * from what i understand, an index like this is used to aggregate reducers
 * and help to generate selectors across reducers, if multiple
 */

export interface BillingsAggregateState {
    billingState: fromBilling.BillingState,
    billingJournalState: fromBillingJournal.BillingJournalState
};


export const reducers: ActionReducerMap<BillingsAggregateState> = {
  billingState: fromBilling.billingReducer,
  billingJournalState: fromBillingJournal.billingJournalReducer
};

//billing selectors  
export const billingStore = createFeatureSelector<BillingsAggregateState>('billings');

export const selectCurrentBillingId = createSelector(
  billingStore,  
  (state: BillingsAggregateState) => state.billingState.selectedBillingId
);

export const selectCurrentBillingPage = createSelector(
  billingStore,  
  (state: BillingsAggregateState) => state.billingState.selectedBillingPage
);

export const selectBillingState = createSelector(billingStore, (state: BillingsAggregateState) => state.billingState);

export const selectAllBillings = createSelector(
  selectBillingState,
  fromBilling.selectAll);
  
export const selectCurrentBilling = createSelector(
  selectAllBillings,
  selectCurrentBillingId,
  (billings, selectedBillingId) => billings.find(billing => billing.id === selectedBillingId)
);

//journal selectors
export const selectCurrentBillingJournalId = createSelector(
  billingStore,  
  (state: BillingsAggregateState) => state.billingJournalState.selectedBillingJournalId
);

export const selectBillingJournalState = createSelector(billingStore, (state: BillingsAggregateState) => state.billingJournalState);

export const selectAllBillingJournals = createSelector(
  selectBillingJournalState,
  fromBillingJournal.selectAll);
  
export const selectCurrentBillingJournal = createSelector(
  selectAllBillingJournals,
  selectCurrentBillingJournalId,
  (billingJournals, selectedBillingJournalId) => 
      billingJournals.find(billingJournal => billingJournal.id === selectedBillingJournalId)
);

