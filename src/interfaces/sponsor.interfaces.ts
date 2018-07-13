export default interface ICountry {
    _id?:string;
    name:string;
    url:string;
    logo:{ data:{ type:string, data:Array<number>, contentType:string}; contentType:string; };
    create_at?:Date;
}