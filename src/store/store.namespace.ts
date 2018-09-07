import ICountry from "../interfaces/country.interfaces";
import ISponsor, { ISponsorForm } from "../interfaces/sponsor.interfaces";
import { FormReducer } from "redux-form";

namespace Store {

    export namespace Types {

        export type CountryComponentType = {
            loading: boolean,
            country: ICountry,
            countries: Array<ICountry>,
            updated: boolean,
            error?: any
        };

        export type SponsorComponentType = {
            loading: boolean,
            sponsors: Array<ISponsor>,
            error?: any
        };

        export type CountryForm = {
            country: {
                _id?: string,
                name: string,
                code: string,
                currency: string
            },
            open: boolean
        };

        export type SponsorForm = {
            sponsor: {
                _id?: string,
                name: string,
                url: string,
                logo: string
            },
            open: boolean
        };

        export type All = {
            CountryComponent: CountryComponentType,
            SponsorComponent: SponsorComponentType,
            CountryData: { country: ICountry, open: boolean },
            SponsorData: { sponsor: ISponsorForm, open: boolean }
        };

    }

    export const country: ICountry = {
        name: null,
        code: null,
        currency: null,
        _id: null
    };

    export const sponsorForm: ISponsorForm = {
        name: null,
        url: null,
        logo: null,
        _id: null
    };

    export const sponsor: ISponsor = {
        _id: null,
        name: null,
        url: null,
        logo: {
            data: {
                type: null,
                data: [],
                contentType: null
            },
            contentType: null
        },
        create_at: new Date()
    };

    const countries: Array<ICountry> = [];
    const sponsors: Array<ISponsor> = [];

    export const CountryComponent: Store.Types.CountryComponentType = {
        loading: true,
        updated: false,
        country,
        countries
    };

    export const SponsorComponent: Store.Types.SponsorComponentType = {
        loading: true,
        sponsors
    };
}
export default Store;