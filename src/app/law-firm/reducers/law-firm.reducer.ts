import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LawFirm } from '../models/lawFirm';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { LawFirmActionsUnion, LawFirmActionTypes } from '../actions/law-firm.actions';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

export interface LawFirmState extends EntityState<LawFirm> { 
  selectedLawFirmId: number | null;
  selectedLawFirmPage : PageResponse<LawFirm>
}

export const lawFirmAdapter: EntityAdapter<LawFirm> = createEntityAdapter<LawFirm>({
  selectId: (lawFirm: LawFirm) => lawFirm.id
});

export const initialState: LawFirmState = lawFirmAdapter.getInitialState({
  selectedLawFirmId: null,
  selectedLawFirmPage: null
});

export function lawFirmReducer (
    state = initialState,
    action: LawFirmActionsUnion
  ) : LawFirmState {
    switch (action.type) {
      case LawFirmActionTypes.LAW_FIRM_CREATE_COMPLETE: {
        return lawFirmAdapter.addOne(action.payload, state);
      } 
      case LawFirmActionTypes.LAW_FIRMS_GET_COMPLETE: {
        state = lawFirmAdapter.upsertMany(action.payload.results, state);
        return { ...state, selectedLawFirmPage: action.payload }
      }   
      case LawFirmActionTypes.LAW_FIRM_SAVE_COMPLETE: {
        return lawFirmAdapter.updateOne({id:action.id, changes: action.changes}, state);
      }
      case LawFirmActionTypes.LAW_FIRM_GET_COMPLETE: {
        state = lawFirmAdapter.upsertOne(action.payload, state);
        return { ...state, selectedLawFirmId: action.payload.id }
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
  } = lawFirmAdapter.getSelectors();
