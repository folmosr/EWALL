export default interface IClasification {
    name:string;
    logo: { data: { type: string, data: Array<number>, contentType: string }; contentType: string; };
    create_at:Date
}