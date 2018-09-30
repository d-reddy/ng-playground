import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromBilling from './billing.reducer';
import * as fromBillingJournal from './billing-journal.reducer';

export interface BillingModuleState {
    billingState: fromBilling.BillingState,
    billingJournalState: fromBillingJournal.BillingJournalState
};


export const reducers: ActionReducerMap<BillingModuleState> = {
  billingState: fromBilling.billingReducer,
  billingJournalState: fromBillingJournal.billingJournalReducer
};

export const billingState = createFeatureSelector<BillingModuleState>('billing');

//billing selectors
export const selectCurrentBillingId = createSelector(
  billingState,  
  (state: BillingModuleState) => state.billingState.selectedBillingId
);

export const selectCurrentBillingPage = createSelector(
  billingState,  
  (state: BillingModuleState) => state.billingState.selectedBillingPage
);

export const selectBillingState = createSelector(billingState, (state: BillingModuleState) => state.billingState);

export const selectAllBillings = createSelector(
  selectBillingState,
  fromBilling.selectAll);
  
export const selectCurrentBilling = createSelector(
  selectAllBillings,
  selectCurrentBillingId,
  (billings, selectedBillingId) => billings.find(billing => billing.id === selectedBillingId)
);

//billing journal selectors
export const selectCurrentBillingJournalId = createSelector(
  billingState,  
  (state: BillingModuleState) => state.billingJournalState.selectedBillingJournalId
);

export const selectBillingJournalState = createSelector(billingState, (state: BillingModuleState) => state.billingJournalState);

export const selectAllBillingJournals = createSelector(
  selectBillingJournalState,
  fromBillingJournal.selectAll);
  
export const selectCurrentBillingJournal = createSelector(
  selectAllBillingJournals,
  selectCurrentBillingJournalId,
  (billingJournals, selectedBillingJournalId) => 
      billingJournals.find(billingJournal => billingJournal.id === selectedBillingJournalId)
);

