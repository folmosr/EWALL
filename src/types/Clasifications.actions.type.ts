import ActionTypeEnum from "../enums/Clasifications.actions.types.enum";
import IClasification, { IClasificationForm } from "../interfaces/Clasification.interface";

export type LoadCalsificationsAction = {
    type: ActionTypeEnum.LOAD_CLASIFICATIONS,
    error?: any,
    loading: boolean
};

export type LoadCalsificationsCompletedAction = {
    type: ActionTypeEnum.LOAD_CLASIFICATIONS_COMPLETED,
    error?: any,
    clasifications: Array<IClasification>,
    loading: boolean
};

export type FulfilledCalsificationsAction = {
    type: ActionTypeEnum.FULFILLED_CLASIFICATIONS,
    clasifications: Array<IClasification>,
    error?: any,
    loading: boolean
};

export type InitFormAction = {
    type: ActionTypeEnum.INIT_FORM,
    clasification: IClasificationForm
};

export type AddClasificationAction = {
    type: ActionTypeEnum.ADD_CLASIFICATION,
    clasification: IClasificationForm,
    error?: any,
    loading: boolean
};

export type DeleteClasificationAction = {
    type: ActionTypeEnum.DELETE_CLASIFICATION,
    clasificationId: string,
    error?: any,
    loading: boolean
};