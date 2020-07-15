import { createFeatureSelector, createSelector } from '@ngrx/store';
import { insertNode, InsertState } from './importer.reducer';

export const selectInsertFeature = createFeatureSelector<InsertState>(insertNode);

export const selectInsert = createSelector (
    selectInsertFeature,
    (state: InsertState): Array<object> => state.array
);

export const selectKeysArray = createSelector (
    selectInsertFeature,
    (state: InsertState): Array<string> => state.keysArray
);

export const selectDownload = createSelector (
    selectInsertFeature,
    (state: InsertState): string => state.download
);

export const selectChoosen = createSelector (
    selectInsertFeature,
    (state: InsertState): number => state.choosen
);

export const selectEditingOne = createSelector (
    selectInsertFeature,
    (state: InsertState): number => state.editingOne
);

export const selectAddedOne = createSelector (
    selectInsertFeature,
    (state: InsertState): boolean => state.addedOne
);
