import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Lop } from '../models/lop';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { LopActionsUnion, LopActionTypes } from '../actions/lop.actions';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

export interface LopState extends EntityState<Lop> { 
  selectedLopId: number | null;
  selectedLopPage : PageResponse<Lop>
}

export const lopAdapter: EntityAdapter<Lop> = createEntityAdapter<Lop>({
  selectId: (lop: Lop) => lop.id
});

export const initialState: LopState = lopAdapter.getInitialState({
  selectedLopId: null,
  selectedLopPage: null
});

export function lopReducer (
    state = initialState,
    action: LopActionsUnion
  ) : LopState {
    switch (action.type) {
      case LopActionTypes.LOP_CREATE_COMPLETE: {
        return lopAdapter.addOne(action.payload, state);
      } 
      case LopActionTypes.LOPS_GET_COMPLETE: {
        state = lopAdapter.upsertMany(action.payload.results, state);
        return { ...state, selectedLopPage: action.payload }
      }   
      case LopActionTypes.LOP_SAVE_COMPLETE: {
        return lopAdapter.updateOne({id:action.id, changes: action.changes}, state);
      }
      case LopActionTypes.LOP_GET_COMPLETE: {
        state = lopAdapter.upsertOne(action.payload, state);
        return { ...state, selectedLopId: action.payload.id }
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
  } = lopAdapter.getSelectors();
