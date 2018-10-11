import { Observable } from "rxjs";
import "rxjs/operators/switchMap";
import { ActionsObservable } from "redux-observable";
import { Action } from "redux";

import { fullfilledClasifications } from "../actions/Clasifications.actions";
import { LoadCalsificationsAction } from "../types/Clasifications.actions.type";
import ActionsTypesEnum from "../enums/Clasifications.actions.types.enum";
import { AddClasificationAction } from "../types/Clasifications.actions.type";


const url: string = `http://localhost:3000/api/clasifications/`;
const setUrlRemoveById:(param:string)=> string = (_id:string)=> `http://localhost:3000/api/clasifications/${_id}`;
const headers: object = { 'Content-Type': 'application/json; charset=utf-8' };

const requestSettings: any = {
    url,
    crossDomain: true
};

function loadClasificationsEpic(actions$: ActionsObservable<Action>): Observable<Action> {
    return actions$.ofType<LoadCalsificationsAction>(ActionsTypesEnum.LOAD_CLASIFICATIONS)
        .switchMap(() => {
            return Observable.ajax(requestSettings)
                .map(q => fullfilledClasifications(q.response));
        });
}

function addClasificationEpic(actions$: ActionsObservable<Action>): Observable<Action> {
    return actions$.ofType<AddClasificationAction>(ActionsTypesEnum.ADD_CLASIFICATION)
        .switchMap((action: AddClasificationAction) => {
            if (action.clasification._id === null ||
                action.clasification._id === undefined ||
                action.clasification._id === "") {
                return Observable.ajax.post(
                    url,
                    action.clasification,
                    headers
                );
            } else {
                return Observable.ajax.put(
                    url,
                   action.clasification,
                   headers
                );
            }
        })
        .switchMap(() => {
            return Observable.ajax(requestSettings)
                .map(q => fullfilledClasifications(q.response));
        });
}

export { loadClasificationsEpic, addClasificationEpic };