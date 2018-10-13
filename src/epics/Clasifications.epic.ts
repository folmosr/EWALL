import { Observable } from "rxjs";
import "rxjs/operators/switchMap";
import { map } from "rxjs/operators";
import { ActionsObservable } from "redux-observable";
import { Action } from "redux";

import {
    fullfilledClasifications,
    loadClasificationsCompleted
} from "../actions/Clasifications.actions";
import {
    LoadCalsificationsAction,
    LoadCalsificationsCompletedAction,
    DeleteClasificationAction
} from "../types/Clasifications.actions.type";
import ActionsTypesEnum from "../enums/Clasifications.actions.types.enum";
import { AddClasificationAction } from "../types/Clasifications.actions.type";


const url: string = `http://localhost:3000/api/clasifications/`;
const setUrlRemoveById: (param: string) => string = (_id: string) => `http://localhost:3000/api/clasifications/${_id}`;
const headers: object = { 'Content-Type': 'application/json; charset=utf-8' };

const requestSettings: any = {
    url,
    crossDomain: true
};

function loadClasificationsEpic(actions$: ActionsObservable<Action>): Observable<Action> {
    return actions$.ofType<LoadCalsificationsAction>(ActionsTypesEnum.LOAD_CLASIFICATIONS)
        .switchMap((action: LoadCalsificationsAction) => {
            return Observable.ajax(requestSettings)
                .map(q => fullfilledClasifications(q.response));
        });
}

function loadClasificationsCompletedEpic(actions$: ActionsObservable<Action>): Observable<Action> {
    return actions$.ofType<LoadCalsificationsCompletedAction>(ActionsTypesEnum.LOAD_CLASIFICATIONS_COMPLETED)
        .pipe(map(action => fullfilledClasifications(action.clasifications)));
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
                .map(q => loadClasificationsCompleted(q.response));
        });
}

function deleteClasificationEpic(actions$: ActionsObservable<Action>): Observable<Action> {
    return actions$.ofType<DeleteClasificationAction>(ActionsTypesEnum.DELETE_CLASIFICATION)
        .switchMap((action: DeleteClasificationAction) => {
            return Observable.ajax.delete(setUrlRemoveById(action.clasificationId));
        })
        .switchMap(() => {
            return Observable.ajax(requestSettings)
                .map(q => loadClasificationsCompleted(q.response));
        });
}

export {
    loadClasificationsEpic,
    loadClasificationsCompletedEpic,
    addClasificationEpic,
    deleteClasificationEpic
};