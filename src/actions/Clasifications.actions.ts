import  {
    LoadCalsificationsAction,
    FulfilledCalsificationsAction
} 
from "../types/Clasifications.actions.type";
import CalsificationsActionTypeEnum  from "../enums/Clasifications.actions.types.enum";
import IClasification from "../interfaces/Clasification.interface";

export function loadClasifications(): LoadCalsificationsAction {
    return {
        type: CalsificationsActionTypeEnum.LOAD_CLASIFICATIONS,
        loading: true
    };
}

export function fullfilledClasifications(clasifications:Array<IClasification>): FulfilledCalsificationsAction {
    return {
        type: CalsificationsActionTypeEnum.FULFILLED_CLASIFICATIONS,
        clasifications,
        loading: false
    };
}