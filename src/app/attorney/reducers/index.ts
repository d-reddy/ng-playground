import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromAttorney from './attorney.reducer';

/**
 * The index file is used to aggregate a few reducers if there 
 * are more than 1 that exists for a feature.
 * 
 * A feature is typically how you might define an indepentent
 * piece of functionality added to the overall application.
 * 
 * In the case of this Attorney module, I want to follow
 * the same pattern for all "features", so for the time
 * being using the index, as is used with all feature 
 * modules.
 */

/**
 * Define how the /attorney slice of the store is mapped
 */
 export interface AttorneyModuleState {
    attorneyState: fromAttorney.AttorneyState
}

 /**
  * Register the reducuers of the /attorney state, in this case
  * just 1, called attorneyState managed by the attorneyReducer.
 */
 export const reducers: ActionReducerMap<AttorneyModuleState> = {
  attorneyState: fromAttorney.attorneyReducer
};

/**
 * The createFeatureSelector allows us to get a top-level state by
 * calling for it by name.
 * 
 * This feature name is defined in the attorney.module file.
 */
export const attorneyState = createFeatureSelector<AttorneyModuleState>('attorney');

export const selectCurrentAttorneyId = createSelector(
  attorneyState,  
  (state: AttorneyModuleState) => state.attorneyState.selectedAttorneyId
);

export const selectCurrentAttorneyPage = createSelector(
  attorneyState,  
  (state: AttorneyModuleState) => state.attorneyState.selectedAttorneyPage
);

export const selectAttorneyState = createSelector(attorneyState, (state: AttorneyModuleState) => state.attorneyState);

export const selectAllAttorneys = createSelector(selectAttorneyState, fromAttorney.selectAll);

export const selectCurrentAttorney = createSelector(
  selectAllAttorneys,
  selectCurrentAttorneyId,
  (attorneys, selectedAttorneyId) => attorneys.find(attorney => attorney.id === selectedAttorneyId)
);

