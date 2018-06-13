import ICountry from "../interfaces/country.interfaces";

namespace Store {

    export namespace Types {

        export type CountryComponentType = {
            loading: boolean,
            country: ICountry,
            countries: Array<ICountry>,
            updated: boolean,
            error?: any
        };

        export type All = {
            CountryComponent: CountryComponentType,
            CountryData: ICountry
        };

        export type CountryForm = {
            _id?: string,
            name: string,
            code: string,
            currency: string
        };
    }

    export const country: ICountry = {
        name: null,
        code: null,
        currency: null,
        _id: null
    };

    const countries: Array<ICountry> = [];

    export const CountryComponent: Store.Types.CountryComponentType = {
        loading: true,
        updated: false,
        country,
        countries
    };
}
export default Store;