import  {
    LoadCalsificationsAction,
    LoadCalsificationsCompletedAction,
    FulfilledCalsificationsAction,
    InitFormAction,
    AddClasificationAction,
    DeleteClasificationAction
} 
from "../types/Clasifications.actions.type";
import ActionsTypesEnum  from "../enums/Clasifications.actions.types.enum";
import IClasification, { IClasificationForm } from "../interfaces/Clasification.interface";

export function loadClasifications(): LoadCalsificationsAction {
    return {
        type: ActionsTypesEnum.LOAD_CLASIFICATIONS,
        loading: true
    };
}

export function loadClasificationsCompleted(clasifications:Array<IClasification>): LoadCalsificationsCompletedAction {
    return {
        type: ActionsTypesEnum.LOAD_CLASIFICATIONS_COMPLETED,
        loading: true,
        clasifications
    };
}

export function fullfilledClasifications(clasifications:Array<IClasification>): FulfilledCalsificationsAction {
    return {
        type: ActionsTypesEnum.FULFILLED_CLASIFICATIONS,
        clasifications,
        loading: false
    };
}

export function initClasificationForm(clasification: IClasificationForm): InitFormAction {
    return {
        type: ActionsTypesEnum.INIT_FORM,
        clasification
    };
}

export function addClasification(clasification: IClasificationForm): AddClasificationAction {
    return {
        type: ActionsTypesEnum.ADD_CLASIFICATION,
        clasification,
        loading: true
    };
}

export function deleteClasification(clasificationId: string): DeleteClasificationAction {
    return {
        type: ActionsTypesEnum.DELETE_CLASIFICATION,
        clasificationId,
        loading: true
    };
}
