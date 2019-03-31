import Store from "../store/Store.namespace";
import ActionsTypesEnum from "../enums/Events.actions.types.enum";
import { InitFormAction } from "../types/Events.actions.type";

type actions = (
    InitFormAction
);
function eventFormReducer(state: Store.Types.EventForm = Store.eventForm, action: actions): Store.Types.EventForm {
    switch (action.type) {
        case ActionsTypesEnum.INIT_FORM:
            return { event: state.event, countries: action.countries, classifications: action.classifications, open: action.open };
        default:
            return state;
    }
}

export { eventFormReducer }