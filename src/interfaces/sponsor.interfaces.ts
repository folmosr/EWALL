export default interface ISponsor {
    _id: string;
    name: string;
    url: string;
    logo: { data: { type: string, data: Array<number>, contentType: string }; contentType: string; };
    create_at?: Date;
    [index: string]: string | object;
}
export interface ISponsorForm {
    _id: string;
    name: string;
    url: string;
    imageBase64Encode: string;
    create_at?: Date;
    open:boolean
}