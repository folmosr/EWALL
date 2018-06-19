export const required: (value: any) => undefined | string = (value: any) => (value) ? undefined : "Este campo es requerido";

export const minLengthOfISO: (value: string, length: number) => undefined | string =
    (value: string, length: number) => (!(value.length > 3)) ? undefined :
        `Excede el máximo permitido para un código ISO {3}`;

export const justLetter: (value: string) => undefined | string = (value: string) => {
    const REGEX:RegExp = /[a-zA-Z]{3,}/y;
    return (REGEX.test(value))?undefined:"Sólo letras (mínimo 3 caracteres)";
}