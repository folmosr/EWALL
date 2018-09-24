import Store from "../store/store.namespace";
import ActionsTypesEnum from "../enums/countriesActionsTypes.enum";
import {
    LoadCountryAction,
    FulfilledCountryAction,
    AddCountryAction,
    InitFormAction,
    DeleteCountryAction
} from "../types/countriesActionsTypes";

type actions = (
    InitFormAction
    | LoadCountryAction
    | FulfilledCountryAction
    | AddCountryAction
    | DeleteCountryAction);

const initialState: Store.Types.CountryComponentType = Store.CountryComponent;

const initialFormState: Store.Types.CountryForm = { country: Store.country, loading:false };

function countriesReducer(state: Store.Types.CountryComponentType = initialState, action: actions): Store.Types.CountryComponentType {
    switch (action.type) {
        case ActionsTypesEnum.LOAD_COUNTRIES:
            return state;
        case ActionsTypesEnum.FULFILLED_COUNTRIES:
            return { loading: action.loading, countries: action.countries };
        case ActionsTypesEnum.DELETE_COUNTRY:
            return { loading: action.loading, countries: state.countries };
        default:
            return state;
    }
}

function countryFormReducer(state: Store.Types.CountryForm = initialFormState, action: actions): Store.Types.CountryForm {
    switch (action.type) {
        case ActionsTypesEnum.INIT_FORM:
            return {
                loading:false,
                country: {
                    _id: action.country._id,
                    name: action.country.name,
                    code: action.country.code,
                    currency: action.country.currency,
                    open: action.country.open
                },
            };
        case ActionsTypesEnum.ADD_COUNTRY:
            return { loading: action.loading, country: action.country };     
        default:
            return state;
    }
}

export { countriesReducer, countryFormReducer };