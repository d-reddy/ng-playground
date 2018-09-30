import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ExamBillingLedger } from '../models/examBillingLedger';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { BillingActionsUnion, BillingActionTypes } from '../actions/billing.actions';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

export interface BillingState extends EntityState<ExamBillingLedger> { 
  selectedBillingId: number | null;
  selectedBillingPage: PageResponse<ExamBillingLedger>;
}

export const billingAdapter: EntityAdapter<ExamBillingLedger> = createEntityAdapter<ExamBillingLedger>({
  selectId: (billing: ExamBillingLedger) => billing.id
});

export const initialState: BillingState = billingAdapter.getInitialState({
  selectedBillingId: null,
  selectedBillingPage: null
});
 
export function billingReducer (
    state = initialState,
    action: BillingActionsUnion
  ) : BillingState {
    switch (action.type) {
      case BillingActionTypes.BILLING_CREATE_COMPLETE: {
        return billingAdapter.addOne(action.payload, state);
      } 
      case BillingActionTypes.BILLINGS_GET_COMPLETE: {
        state = billingAdapter.upsertMany(action.payload.results, state);
        return { ...state, selectedBillingPage: action.payload }
      }   
      case BillingActionTypes.BILLING_SAVE_COMPLETE: {
        return billingAdapter.updateOne({id:action.id, changes: action.changes}, state);
      }
      case BillingActionTypes.BILLING_GET_COMPLETE: {
        state = billingAdapter.upsertOne(action.payload, state);
        return { ...state, selectedBillingId: action.payload.id }
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
  } = billingAdapter.getSelectors();
