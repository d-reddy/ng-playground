import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromClaimsAdjuster from './claims-adjuster.reducer';

export interface ClaimsAdjustersModuleState {
    claimsAdjusterState: fromClaimsAdjuster.ClaimsAdjustersState
}

export const reducers: ActionReducerMap<ClaimsAdjustersModuleState> = {
  claimsAdjusterState: fromClaimsAdjuster.claimsAdjusterReducer
};

export const claimsAdjusterState = createFeatureSelector<ClaimsAdjustersModuleState>('claimsAdjuster');

export const selectCurrentClaimsAdjusterId = createSelector(
  claimsAdjusterState,  
  (state: ClaimsAdjustersModuleState) => state.claimsAdjusterState.selectedClaimsAdjusterId
);

export const selectCurrentClaimsAdjusterPage = createSelector(
  claimsAdjusterState,  
  (state: ClaimsAdjustersModuleState) => state.claimsAdjusterState.selectedClaimsAdjusterPage
);

export const selectClaimsAdjusterState = createSelector(claimsAdjusterState, (state: ClaimsAdjustersModuleState) => state.claimsAdjusterState);

export const selectAllClaimsAdjusters = createSelector(selectClaimsAdjusterState, fromClaimsAdjuster.selectAll);

export const selectCurrentClaimsAdjuster = createSelector(
  selectAllClaimsAdjusters,
  selectCurrentClaimsAdjusterId,
  (claimsAdjusters, selectedClaimsAdjusterId) => claimsAdjusters.find(claimsAdjuster => claimsAdjuster.id === selectedClaimsAdjusterId)
);

