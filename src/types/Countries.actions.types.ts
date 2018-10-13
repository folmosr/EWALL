import ICountry from "../interfaces/Country.interfaces";
import ActionsTypesEnum from "../enums/Countries.actions.types.enum";

export type LoadCountryAction = {
    type: ActionsTypesEnum.LOAD_COUNTRIES,
    error?: any,
    loading: boolean
};

export type LoadCountriesCompletedAction = {
    type: ActionsTypesEnum.LOAD_COUNTRIES_COMPLETED,
    error?: any,
    countries: Array<ICountry>,
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

export type InitFormAction = {
    type: ActionsTypesEnum.INIT_FORM,
    country: ICountry
};

export type DeleteCountryAction = {
    type: ActionsTypesEnum.DELETE_COUNTRY,
    country: ICountry,
    loading: true
};