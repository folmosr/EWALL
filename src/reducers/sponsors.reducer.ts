import Store from "../store/store.namespace";
import ActionsTypesEnum from "../enums/sponsorsActionsTypes.enum";
import {
    LoadSponsorAction,
    FullfilledSponsorAction
} from "../types/sponsorsActionsTypes";

type actions = (
      LoadSponsorAction
    | FullfilledSponsorAction
);

const initialState: Store.Types.SponsorComponentType = Store.SponsorComponent;

function sponsorReducer(state: Store.Types.SponsorComponentType = initialState, action: actions): Store.Types.SponsorComponentType {
    switch (action.type) {
        case ActionsTypesEnum.LOAD_SPONSORS:
            return state;
        case ActionsTypesEnum.FULFILLED_SPONSORS:
            return { loading: action.loading, sponsors: action.sponsors };
        default:
            return state;
    }
}
export { sponsorReducer };