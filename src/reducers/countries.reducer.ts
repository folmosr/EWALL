import Store from "../store/store.namespace";
import ActionsTypesEnum from "../enums/actionstypes.enum";
import ICountry from "../interfaces/country.interfaces";
import {
    LoadCountryAction,
    FulfilledCountryAction,
    AddCountryAction,
    UpdatedCountryAction,
    InitFomrAction
} from "../types/countries.actions.type";

type actions = (
    InitFomrAction
    | LoadCountryAction
    | FulfilledCountryAction
    | AddCountryAction
    | UpdatedCountryAction);

const initialState: Store.Types.CountryComponentType = Store.CountryComponent;

const initialFormState: Store.Types.CountryForm = Store.country;

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
        default:
            return state;
    }
}

function countryFormReducer(state: Store.Types.CountryForm = initialFormState, action: actions): Store.Types.CountryForm {
    switch (action.type) {
        case ActionsTypesEnum.INIT_FORM:
            return {
                _id: action.country._id,
                name: action.country.name,
                code: action.country.code,
                currency: action.country.currency
            };
        default:
            return state;
    }
}

export { countriesReducer, countryFormReducer };