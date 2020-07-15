import { InsertState, insertReducer, insertNode } from './importer/importer.reducer';
import { environment } from './../../environments/environment.prod';
import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';

export interface State {
    [insertNode]: InsertState;
}

export const reducers: ActionReducerMap<State> = {
    [insertNode]: insertReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
