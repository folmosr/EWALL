import {
    LoadCountryAction,
    FulfilledCountryAction,
    AddCountryAction,
    UpdatedCountryAction,
    InitFomrAction,
    DeleteCountryAction
} from "../types/countries.actions.type";
import ICountry from "../interfaces/country.interfaces";
import ActionsTypesEnum from "../enums/actionstypes.enum";

function loadCountries(): LoadCountryAction {
    return {
        type: ActionsTypesEnum.LOAD_COUNTRIES,
        loading: true
    };
}

function fullfilledCountries(countries: Array<ICountry>): FulfilledCountryAction {
    return {
        type: ActionsTypesEnum.FULFILLED_COUNTRIES,
        countries,
        loading: false
    };
}

function addCountry(country: ICountry): AddCountryAction {
    return {
        type: ActionsTypesEnum.ADD_COUNTRY,
        country,
        loading: true
    };
}

function deleteCountry(country: ICountry): DeleteCountryAction {
    return {
        type: ActionsTypesEnum.DELETE_COUNTRY,
        country,
        loading:true
    };
}

function updatedCountries(countries: Array<ICountry>): UpdatedCountryAction {
    return {
        type: ActionsTypesEnum.UPDATED_COUNTRIES,
        countries,
        updated: true,
        loading: false
    };
}

function initCountryForm(country: ICountry): InitFomrAction {
    return {
        type: ActionsTypesEnum.INIT_FORM,
        country
    };
}

export {
    loadCountries,
    fullfilledCountries,
    addCountry,
    updatedCountries,
    initCountryForm,
    deleteCountry
};