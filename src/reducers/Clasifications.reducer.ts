import Store from "../store/Store.namespace"
import ActionsTypesEnum from "../enums/Clasifications.actions.types.enum";
import {
    LoadCalsificationsAction,
    FulfilledCalsificationsAction,
    InitFormAction,
    AddClasificationAction
} from "../types/Clasifications.actions.type";

type actions = (
    LoadCalsificationsAction
    | FulfilledCalsificationsAction
    | AddClasificationAction
    | InitFormAction
);
const initialState: Store.Types.ClasificationComponentType = {
    loading: true,
    clasifications: []
}
const initialFormState: Store.Types.ClasificationForm = { clasification: Store.clasificationForm, loading: false };

function clasificationReducer(state: Store.Types.ClasificationComponentType = initialState, action: actions): Store.Types.ClasificationComponentType {
    switch (action.type) {
        case ActionsTypesEnum.FULFILLED_CLASIFICATIONS:
            return { loading: action.loading, clasifications: action.clasifications };
        case ActionsTypesEnum.LOAD_CLASIFICATIONS:
        default:
            return state;
    }
}

function clasificationFormReducer(state: Store.Types.ClasificationForm = initialFormState, action: actions): Store.Types.ClasificationForm {
    switch (action.type) {
        case ActionsTypesEnum.INIT_FORM:
            return {
                loading: false,
                clasification: {
                    _id: action.clasification._id,
                    name: action.clasification.name,
                    imageBase64Encode: action.clasification.imageBase64Encode,
                    open: action.clasification.open
                },
            };
        case ActionsTypesEnum.ADD_CLASIFICATION:
            return {
                loading: action.loading,
                clasification: action.clasification
            };
        default:
            return state;
    }
}

export { clasificationReducer, clasificationFormReducer }