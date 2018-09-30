import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromLop from './lop.reducer';

export interface LopModuleState {
    lopState: fromLop.LopState
}

export const reducers: ActionReducerMap<LopModuleState> = {
  lopState: fromLop.lopReducer
};

export const lopState = createFeatureSelector<LopModuleState>('lop');

export const selectCurrentLopId = createSelector(
  lopState,  
  (state: LopModuleState) => state.lopState.selectedLopId
);

export const selectCurrentLopPage = createSelector(
  lopState,  
  (state: LopModuleState) => state.lopState.selectedLopPage
);

export const selectLopState = createSelector(lopState, (state: LopModuleState) => state.lopState);

export const selectAllLops = createSelector(selectLopState, fromLop.selectAll);

export const selectCurrentLop = createSelector(
  selectAllLops,
  selectCurrentLopId,
  (lops, selectedLopId) => lops.find(lop => lop.id === selectedLopId)
);

