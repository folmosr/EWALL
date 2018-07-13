import Store from "../store/store.namespace";
import ActionsTypesEnum from "../enums/countriesActionsTypes.enum";
import {
    LoadCountryAction,
    FulfilledCountryAction,
    AddCountryAction,
    UpdatedCountryAction,
    InitFomrAction,
    DeleteCountryAction
} from "../types/countriesActionsTypes";

type actions = (
    InitFomrAction
    | LoadCountryAction
    | FulfilledCountryAction
    | AddCountryAction
    | UpdatedCountryAction
    | DeleteCountryAction);

const initialState: Store.Types.CountryComponentType = Store.CountryComponent;

const initialFormState: Store.Types.CountryForm = {country:Store.country, open:false};

function countriesReducer(state: Store.Types.CountryComponentType = initialState, action: actions): Store.Types.CountryComponentType {
    switch (action.type) {
        case ActionsTypesEnum.LOAD_COUNTRIES:
            return state;
        case ActionsTypesEnum.FULFILLED_COUNTRIES:
            return { loading: action.loading, country: state.country, countries: action.countries, updated: state.updated };
        case ActionsTypesEnum.UPDATED_COUNTRIES:
            return { loading: action.loading, country: state.country, countries: action.countries, updated: action.updated };
        case ActionsTypesEnum.ADD_COUNTRY:
            return { loading: action.loading, country: action.country, countries: state.countries, updated: state.updated };
        case ActionsTypesEnum.DELETE_COUNTRY:
            return { loading: action.loading, country: action.country, countries: state.countries, updated: state.updated };
        default:
            return state;
    }
}

function countryFormReducer(state: Store.Types.CountryForm = initialFormState, action: actions): Store.Types.CountryForm {
    switch (action.type) {
        case ActionsTypesEnum.INIT_FORM:
            return {
                country: {
                    _id: action.country._id,
                    name: action.country.name,
                    code: action.country.code,
                    currency: action.country.currency
                },
                open: action.open
            };
        default:
            return state;
    }
}

export { countriesReducer, countryFormReducer };