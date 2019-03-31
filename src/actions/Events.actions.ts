import ICountry from "../interfaces/Country.interfaces";
import IClasification from "../interfaces/Clasification.interface";
import ActionsTypesEnum from "../enums/Events.actions.types.enum";
import { InitFormAction } from "../types/Events.actions.type";


function initEventForm(countries: Array<ICountry>, classifications: Array<IClasification>): InitFormAction {
    return {
        type: ActionsTypesEnum.INIT_FORM,
        countries,
        classifications,
        open: true
    };
}

export {
    initEventForm
};