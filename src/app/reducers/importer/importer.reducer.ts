import { InsertActions, insertActionsType } from './importer.actions';

export const insertNode = 'insert';

export interface InsertState {
    array: Array<object>;
    keysArray: Array<string>;
    choosen: number;
    download: string;
    editingOne: number;
    addedOne: boolean;
}

const initialState: InsertState = {
    array: [

    ],
    keysArray: [],
    choosen: 0,
    download: '',
    editingOne: 0,
    addedOne: false
};

export const insertReducer =  (state = initialState, action: InsertActions) => {
    switch (action.type) {
        case insertActionsType.upload: {
            const newKeysArray = [];
            for (let key in action.payload[0]) {
                newKeysArray.push(key);
            }
            let i = 1;
            const payloadId = action.payload.map(s => {
                const sCopy = {...s};
                sCopy.id = i;
                i++;
                return sCopy;

            });
            return {
                ...state,
                array: payloadId,
                keysArray: newKeysArray,
                choosen: 0,
                editingOne: 0,
                addedOne: false
            };
        }

        case insertActionsType.download: {
            const removeId = state.array.map(s => {
                const sCopy = {...s};
                delete sCopy.id;
                return sCopy;
            });
            const result = JSON.stringify(removeId);
            return {
                ...state,
                download: result
            };
        }

        case insertActionsType.choose: {
            const stateCopy = {...state};
            stateCopy.choosen = action.payload;
            return stateCopy;
        }

        case insertActionsType.addNew: {
            const stateCopy = {...state};
            stateCopy.array = [...state.array];
            const newObject = {
                [state.keysArray[0]]: '',
                [state.keysArray[1]]: '',
                [state.keysArray[2]]: '',
                [state.keysArray[3]]: '',
                [state.keysArray[4]]: '',
                [state.keysArray[5]]: '',
                id: stateCopy.array.length + 1
            };
            stateCopy.array.push(newObject);
            stateCopy.addedOne = true
            return stateCopy;
        }

        case insertActionsType.remove: {
            const stateCopy = {...state};
            stateCopy.array = state.array.filter(s => {
                return s.id !== stateCopy.choosen;
            });
            stateCopy.choosen = 0;
            let i = 1;
            stateCopy.array = stateCopy.array.map(s => {
                const sCopy = {...s};
                sCopy.id = i;
                i++;
                return sCopy;

            });
            return stateCopy;
        }

        case insertActionsType.editOne: {
            const stateCopy = {...state};
            stateCopy.editingOne = stateCopy.choosen;
            stateCopy.addedOne = true;
            return stateCopy;
        }

        case insertActionsType.setValues: {
            const stateCopy = {...state};
            stateCopy.array = [...state.array];
            stateCopy.array = stateCopy.array.map(s => {
                const sCopy = {...s};
                if (sCopy.id === action.id) {
                    if (action.firstInput !== undefined && action.firstInput !== '') {
                        sCopy[state.keysArray[0]] = action.firstInput;
                    }

                    if (action.secondInput !== undefined && action.secondInput !== '') {
                        sCopy[state.keysArray[1]] = action.secondInput;
                    }

                    if (action.thirdInput !== undefined && action.thirdInput !== '') {
                        sCopy[state.keysArray[2]] = action.thirdInput;
                    }
                    if (action.fourthInput !== undefined && action.fourthInput !== '') {
                        sCopy[state.keysArray[3]] = action.fourthInput;
                    }

                    if (action.fifthInput !== undefined && action.fifthInput !== '') {
                        sCopy[state.keysArray[4]] = action.fifthInput;
                    }

                    if (action.sixthInput !== undefined && action.sixthInput !== '') {
                        sCopy[state.keysArray[5]] = action.sixthInput;
                    }


                }
                return sCopy;
            });
            stateCopy.editingOne = 0;
            stateCopy.addedOne = false;
            return stateCopy;
        }

        default: {
            return state;
        }
    }
};

// [{"name":"Name 1","year":"2010"},
// {"name":"Name 2","year":"1997"},
// {"name":"Name 3","year":"2004"}]



// {
//     ...stateCopy.array[0],
//     id: stateCopy.array.length + 1,
// }