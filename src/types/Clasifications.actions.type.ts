import ActionTypeEnum from "../enums/Clasifications.actions.types.enum";
import IClasification from "../interfaces/Clasification.interface";

export type LoadCalsificationsAction = {
    type: ActionTypeEnum.LOAD_CLASIFICATIONS,
    error?: any,
    loading: boolean
};

export type FulfilledCalsificationsAction = {
    type: ActionTypeEnum.FULFILLED_CLASIFICATIONS,
    clasifications: Array<IClasification>,
    error?: any,
    loading: boolean
};
