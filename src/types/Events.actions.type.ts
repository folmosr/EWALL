import ICountry from "../interfaces/Country.interfaces";
import IClasification from "../interfaces/Clasification.interface";
import ActionsTypesEnum from "../enums/Events.actions.types.enum";
import { countryFormReducer } from "../reducers/Countries.reducer";

export type InitFormAction = {
    type: ActionsTypesEnum.INIT_FORM,
    event?:{
        _id:string,
        country:string,
        classification:string
    }
    countries: Array<ICountry>,
    classifications:Array<IClasification>,
    open:boolean
};