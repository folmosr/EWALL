import ICountry from "./Country.interfaces";
import IClasification from "./Clasification.interface";

export interface IEvent {
    _id: string,
    countryId: string,
    classificationId: string
}
export interface IEventForm {
    event: {
        _id: string;
        country: string,
        classification: string
    },
    countries: Array<ICountry>,
    classifications: Array<IClasification>,
    open: boolean
}