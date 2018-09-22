import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BillingJournal } from '../models/billingJournal';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { BillingJournalActionsUnion, BillingJournalActionTypes } from '../actions/billing-journal.actions';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface BillingJournalState extends EntityState<BillingJournal> { 
  selectedBillingJournalId: number | null;
}


/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const billingJournalAdapter: EntityAdapter<BillingJournal> = createEntityAdapter<BillingJournal>({
  selectId: (billingJournal: BillingJournal) => billingJournal.id
});


/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: BillingJournalState = billingJournalAdapter.getInitialState({
  selectedBillingJournalId: null
});
 
export function billingJournalReducer (
    state = initialState,
    action: BillingJournalActionsUnion
  ) : BillingJournalState {
    switch (action.type) {
      case BillingJournalActionTypes.BILLING_JOURNAL_CREATE_COMPLETE: {
        /**
       * The addOne function provided by the created adapter
       * adds one record to the entity dictionary
       * and returns a new state including that records if it doesn't
       * exist already. If the collection is to be sorted, the adapter will
       * insert the new record into the sorted array.
       */

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


  /**
   * Because the data structure is defined within the reducer it is optimal to
   * locate our selector functions at this level. If store is to be thought of
   * as a database, and reducers the tables, selectors can be considered the
   * queries into said database. Remember to keep your selectors small and
   * focused so they can be combined and composed to fit each particular
   * use-case.
   */
  
  export const {
    selectIds: selectIds,
    selectEntities: selectEntities,
    selectAll: selectAll,
    selectTotal: selectTotal
  } = billingJournalAdapter.getSelectors();
