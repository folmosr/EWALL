import ICountry from "../interfaces/country.interfaces";
import ActionsTypesEnum from "../enums/countriesActionsTypes.enum";

export type LoadCountryAction = {
    type: ActionsTypesEnum.LOAD_COUNTRIES,
    error?: any,
    loading: boolean
};

export type FulfilledCountryAction = {
    type: ActionsTypesEnum.FULFILLED_COUNTRIES,
    countries: Array<ICountry>,
    error?: any,
    loading: boolean
};

export type AddCountryAction = {
    type: ActionsTypesEnum.ADD_COUNTRY,
    country: ICountry,
    error?: any,
    loading: boolean
};

export type UpdatedCountryAction = {
    type: ActionsTypesEnum.UPDATED_COUNTRIES,
    countries: Array<ICountry>,
    updated: boolean
    error?: any,
    loading: boolean
};

export type InitFormAction = {
    type: ActionsTypesEnum.INIT_FORM,
    country: ICountry,
    open: boolean
};

export type DeleteCountryAction = {
    type: ActionsTypesEnum.DELETE_COUNTRY,
    country: ICountry,
    loading: true
};