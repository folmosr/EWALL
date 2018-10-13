export default interface IClasification {
    _id?: string;
    name: string;
    logo: { data: { type: string, data: Array<number>, contentType: string }; contentType: string; };
    create_at: Date
}

export interface IClasificationForm {
    name: string;
    imageBase64Encode: string;
    _id: string;
    create_at?: Date;
    open: boolean
}