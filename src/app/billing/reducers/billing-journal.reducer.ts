import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BillingJournal } from '../models/billingJournal';
import { BillingJournalActionsUnion, BillingJournalActionTypes } from '../actions/billing-journal.actions';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

export interface BillingJournalState extends EntityState<BillingJournal> { 
  selectedBillingJournalId: number | null;
}

export const billingJournalAdapter: EntityAdapter<BillingJournal> = createEntityAdapter<BillingJournal>({
  selectId: (billingJournal: BillingJournal) => billingJournal.id
});

export const initialState: BillingJournalState = billingJournalAdapter.getInitialState({
  selectedBillingJournalId: null
});
 
export function billingJournalReducer (
    state = initialState,
    action: BillingJournalActionsUnion
  ) : BillingJournalState {
    switch (action.type) {
      case BillingJournalActionTypes.BILLING_JOURNAL_CREATE_COMPLETE: {
        return billingJournalAdapter.addOne(action.payload, state);
      } 
      case BillingJournalActionTypes.BILLING_JOURNAL_SAVE_COMPLETE: {
        return billingJournalAdapter.updateOne({id:action.id, changes: action.changes}, state);
      }
      case BillingJournalActionTypes.BILLING_JOURNAL_GET_COMPLETE: {
        state = billingJournalAdapter.upsertOne(action.payload, state);
        return { ...state, selectedBillingJournalId: action.payload.id }
      }       
      default: {
        return state;
      }
    }
  }

  export const {
    selectIds: selectIds,
    selectEntities: selectEntities,
    selectAll: selectAll,
    selectTotal: selectTotal
  } = billingJournalAdapter.getSelectors();
