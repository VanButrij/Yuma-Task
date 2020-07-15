import { Action } from '@ngrx/store';

export enum insertActionsType {
    upload = '[IMPORTER] upload',
    choose = '[IMPORTER] choose',
    addNew = '[IMPORTER] addNew',
    editOne = '[IMPORTER] editOne',
    remove = '[IMPORTER] remove',
    download = '[IMPORTER] download',
    setValues = '[IMPORTER] setValues'
}

export class InsertUploadAction implements Action {
    readonly type = insertActionsType.upload;
    constructor(public payload: {insertOne: Array<object>}) {}
}

export class InsertChooseAction implements Action {
    readonly type = insertActionsType.choose;
    constructor(public payload: {choosen: number}) {}
}

export class InsertAddNewAction implements Action {
    readonly type = insertActionsType.addNew;
}

export class InsertEditOneAction implements Action {
    readonly type = insertActionsType.editOne;
}

export class InsertRemoveAction implements Action {
    readonly type = insertActionsType.remove;
}

export class InsertDownloadAction implements Action {
    readonly type = insertActionsType.download;
}

export class InsertSetValuesAction implements Action {
    readonly type = insertActionsType.setValues;
    constructor(public firstInput: {firstInput: string},
                public secondInput: {secondInput: string},
                public thirdInput: {thirdInput: string},
                public fourthInput: {fourthInput: string},
                public fifthInput: {fifthInput: string},
                public sixthInput: {sixthInput: string},
                public id: {iterId: number}) {}
}

export type InsertActions = InsertUploadAction
                         | InsertAddNewAction
                         | InsertEditOneAction
                         | InsertRemoveAction
                         | InsertDownloadAction
                         | InsertChooseAction
                         | InsertSetValuesAction;

