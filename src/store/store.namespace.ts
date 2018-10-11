import ICountry from "../interfaces/Country.interfaces";
import IClasification from "../interfaces/Clasification.interface";
import ISponsor, { ISponsorForm } from "../interfaces/Sponsor.interfaces";

namespace Store {

    export namespace Types {

        export type ClasificationComponentType = {
            loading: boolean,
            clasifications: Array<IClasification>,
            error?: any
        };

        export type CountryComponentType = {
            loading: boolean,
            countries: Array<ICountry>,
            error?: any
        };

        export type SponsorComponentType = {
            loading: boolean,
            sponsors: Array<ISponsor>,
            error?: any
        };

        export type CountryForm = {
            loading: boolean;
            country: {
                _id?: string,
                name: string,
                code: string,
                currency: string,
                open?: boolean
            }
        };

        export type SponsorForm = {
            sponsor: {
                _id?: string,
                name: string,
                url: string,
                imageBase64Encode: string,
                open: boolean
            },
            loading?: boolean
        };

        export type All = {
            CountryComponent: CountryComponentType,
            ClasificationData: ClasificationComponentType,
            SponsorComponent: SponsorComponentType,
            CountryData: { country: ICountry },
            SponsorData: { sponsor: ISponsorForm }
        };

    }

    export const country: ICountry = {
        name: null,
        code: null,
        currency: null,
        _id: null,
        open: false
    };

    export const sponsorForm: ISponsorForm = {
        name: null,
        url: null,
        imageBase64Encode: null,
        _id: null,
        open: false
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
    const clasifications : Array<IClasification> = [];

    export const CountryComponent: Store.Types.CountryComponentType = {
        loading: true,
        countries
    };

    export const SponsorComponent: Store.Types.SponsorComponentType = {
        loading: true,
        sponsors
    };

    export const ClasificationComponent:Store.Types.ClasificationComponentType = {
        loading: true,
        clasifications
    }
}
export default Store;