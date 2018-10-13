import Store from "../store/Store.namespace";
import ActionsTypesEnum from "../enums/Countries.actions.types.enum";
import {
    LoadCountryAction,
    FulfilledCountryAction,
    AddCountryAction,
    InitFormAction,
    DeleteCountryAction,
    LoadCountriesCompletedAction
} from "../types/Countries.actions.types";

type actions = (
    InitFormAction
    | LoadCountryAction
    | LoadCountriesCompletedAction
    | FulfilledCountryAction
    | AddCountryAction
    | DeleteCountryAction);

const initialState: Store.Types.CountryComponentType = Store.CountryComponent;

const initialFormState: Store.Types.CountryForm = { country: Store.country, loading: false };

function countriesReducer(state: Store.Types.CountryComponentType = initialState, action: actions): Store.Types.CountryComponentType {
    switch (action.type) {
        case ActionsTypesEnum.LOAD_COUNTRIES:
            return state;
        case ActionsTypesEnum.LOAD_COUNTRIES_COMPLETED:
            return { loading: action.loading, countries: action.countries };
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
                loading: false,
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