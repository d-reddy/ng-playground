import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromLawFirm from './law-firm.reducer';

export interface LawFirmModuleState {
    lawFirmState: fromLawFirm.LawFirmState
}

export const reducers: ActionReducerMap<LawFirmModuleState> = {
  lawFirmState: fromLawFirm.lawFirmReducer
};

export const lawFirmState = createFeatureSelector<LawFirmModuleState>('lawFirm');

export const selectCurrentLawFirmId = createSelector(
  lawFirmState,  
  (state: LawFirmModuleState) => state.lawFirmState.selectedLawFirmId
);

export const selectCurrentLawFirmPage = createSelector(
  lawFirmState,  
  (state: LawFirmModuleState) => state.lawFirmState.selectedLawFirmPage
);

export const selectLawFirmState = createSelector(lawFirmState, (state: LawFirmModuleState) => state.lawFirmState);

export const selectAllLawFirms = createSelector(selectLawFirmState, fromLawFirm.selectAll);

export const selectCurrentLawFirm = createSelector(
  selectAllLawFirms,
  selectCurrentLawFirmId,
  (lawFirms, selectedLawFirmId) => lawFirms.find(lawFirm => lawFirm.id === selectedLawFirmId)
);

