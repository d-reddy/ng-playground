import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromLawFirm from './law-firm.reducer';

/**
 * from what i understand, an index like this is used to aggregate reducers
 * and help to generate selectors across reducers, if multiple
 */

export interface LawFirmsAggregateState {
    lawFirmsState: fromLawFirm.LawFirmsState,
    //other type of lawFirm "state" ...ie AddressHistory???
}

//lawFirm selectors  
export const lawFirmsState = createFeatureSelector<fromLawFirm.LawFirmsState>('lawFirms');

export const selectCurrentLawFirmId = createSelector(
  lawFirmsState,  
  (state: fromLawFirm.LawFirmsState) => state.selectedLawFirmId
);

export const selectCurrentLawFirmPage = createSelector(
  lawFirmsState,  
  (state: fromLawFirm.LawFirmsState) => state.selectedLawFirmPage
);

export const selectAllLawFirms = createSelector(lawFirmsState, fromLawFirm.selectAll);

//get selected lawFirm
export const selectCurrentLawFirm = createSelector(
  selectAllLawFirms,
  selectCurrentLawFirmId,
  (lawFirms, selectedLawFirmId) => lawFirms.find(lawFirm => lawFirm.id === selectedLawFirmId)
);

