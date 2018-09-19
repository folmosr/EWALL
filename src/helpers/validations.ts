import ICountry from "../interfaces/country.interfaces";

export const required: (value: any) => undefined | string = (value: any) => (value) ? undefined : "Este campo es requerido";

export const minLengthOfISO: (value: string, length: number) => undefined | string =
    (value: string, length: number) => (!(value.length > 3)) ? undefined :
        `Excede el máximo permitido para un código ISO {3}`;

export const justLetter: (value: string) => undefined | string = (value: string) => {
    const REGEX: RegExp = /[a-zA-Z]{3,}/y;
    return (REGEX.test(value)) ? undefined : "Sólo letras (mínimo 3 caracteres)";
};

export const isValidURL: (value: string) => undefined | string = (value: string) => {
    const REGEX: RegExp =  /^(ftp|http|https):\/\/[^ "]+$/y;
    return (REGEX.test(value)) ? undefined : "URL inválida";
};

export const asyncValidateCountry: (value: ICountry) => Promise<void> = async (value: ICountry) => {
    await api<Array<ICountry>>(`http://localhost:3000/api/countries/${value.code}`)
        .then(response => {
            let country: ICountry = response.find((element: ICountry) => element.code === value.code);
            if (country) {
                return Promise.reject({ code: `Código de país ${value.code} existente` });
            }
        });
};

// implementation code where T is the returned data shape
function api<T>(url: string): Promise<T> {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
}