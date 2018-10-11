import Store from "../store/Store.namespace"
import ActionsTypesEnum from "../enums/Clasifications.actions.types.enum";
import {
    LoadCalsificationsAction,
    FulfilledCalsificationsAction
} from "../types/Clasifications.actions.type";

type actions = (
    LoadCalsificationsAction
    | FulfilledCalsificationsAction
);
const initialState:Store.Types.ClasificationComponentType = {
    loading:true,
    clasifications : []
}
function clasificationReducer(state: Store.Types.ClasificationComponentType = initialState, action: actions): Store.Types.ClasificationComponentType {
    switch (action.type) {
        case ActionsTypesEnum.FULFILLED_CLASIFICATIONS:
            return { loading: action.loading, clasifications: action.clasifications };
        case ActionsTypesEnum.LOAD_CLASIFICATIONS:
        default:
            return state;
    }
}

export {clasificationReducer }