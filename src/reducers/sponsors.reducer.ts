import Store from "../store/store.namespace";
import ActionsTypesEnum from "../enums/sponsorsActionsTypes.enum";
import {
    LoadSponsorAction,
    FullfilledSponsorAction,
    AddSponsorAction,
    InitFormAction,
    DeleteSponsorAction
}
    from "../types/sponsorsActionsTypes";

type actions = (
    InitFormAction
    | LoadSponsorAction
    | FullfilledSponsorAction
    | AddSponsorAction
    | DeleteSponsorAction
);

const initialState: Store.Types.SponsorComponentType = Store.SponsorComponent;
const initialFormState: Store.Types.SponsorForm = { sponsor: Store.sponsorForm, open: false };

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
                sponsor: {
                    _id: action.sponsor._id,
                    name: action.sponsor.name,
                    url: action.sponsor.url,
                    imageBase64Encode: action.sponsor.imageBase64Encode
                },
                open: action.open
            };
        case ActionsTypesEnum.ADD_SPONSOR:
            return { loading: action.loading, sponsor: action.sponsor, open: false };
        default:
            return state;
    }
}

export { sponsorReducer, sponsorFormReducer };