import Store from "../store/Store.namespace";
import ActionsTypesEnum from "../enums/Sponsors.actions.types.enum";
import {
    LoadSponsorAction,
    FullfilledSponsorAction,
    AddSponsorAction,
    InitFormAction,
    DeleteSponsorAction
}
    from "../types/Sponsors.actions.types";

type actions = (
    InitFormAction
    | LoadSponsorAction
    | FullfilledSponsorAction
    | AddSponsorAction
    | DeleteSponsorAction
);

const initialState: Store.Types.SponsorComponentType = Store.SponsorComponent;
const initialFormState: Store.Types.SponsorForm = { sponsor: Store.sponsorForm };

function sponsorReducer(state: Store.Types.SponsorComponentType = initialState, action: actions): Store.Types.SponsorComponentType {
    switch (action.type) {
        case ActionsTypesEnum.LOAD_SPONSORS:
            return state;
        case ActionsTypesEnum.FULFILLED_SPONSORS:
            return { loading: action.loading, sponsors: action.sponsors };
        case ActionsTypesEnum.DELETE_SPONSOR:
        default:
            return state;
    }
}

function sponsorFormReducer(state: Store.Types.SponsorForm = initialFormState, action: actions): Store.Types.SponsorForm {
    switch (action.type) {
        case ActionsTypesEnum.INIT_FORM:
            return {
                loading: action.loading,
                sponsor: {
                    _id: action.sponsor._id,
                    name: action.sponsor.name,
                    url: action.sponsor.url,
                    imageBase64Encode: action.sponsor.imageBase64Encode,
                    open: action.sponsor.open
                },
            };
        case ActionsTypesEnum.ADD_SPONSOR:
            return { loading: action.loading, sponsor: action.sponsor };
        default:
            return state;
    }
}

export { sponsorReducer, sponsorFormReducer };