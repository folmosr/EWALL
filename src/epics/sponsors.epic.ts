import { Observable } from "rxjs";
import "rxjs/operators/switchMap";
import { ActionsObservable } from "redux-observable";
import { Action } from "redux";
import ActionsTypesEnum from "../enums/Sponsors.actions.types.enum";

import { fullfilledSponsors, loadSponsorsCompleted } from "../actions/Sponsors.actions";
import {
    LoadSponsorAction,
    AddSponsorAction,
    DeleteSponsorAction,
    LoadSponsorsCompletedAction
} from "../types/Sponsors.actions.types";
import { map } from "rxjs/operators";

const url: string = `http://localhost:3000/api/organizations/`;
const headers: object = { 'Content-Type': 'application/json; charset=utf-8' };
const requestSettings: any = {
    url,
    crossDomain: true
};

function loadSponsorsEpic(actions$: ActionsObservable<Action>): Observable<Action> {
    return actions$.ofType<LoadSponsorAction>(ActionsTypesEnum.LOAD_SPONSORS)
        .switchMap(() => {
            return Observable.ajax(requestSettings)
                .map(q => fullfilledSponsors(q.response));
        });
}

function loadSponsorsCompletedEpic(actions$: ActionsObservable<Action>): Observable<Action> {
    return actions$.ofType<LoadSponsorsCompletedAction>(ActionsTypesEnum.LOAD_SPONSORS_COMPLETED)
        .pipe(map(action => fullfilledSponsors(action.sponsors)));
}

function addSponsorsEpic(actions$: ActionsObservable<Action>): Observable<Action> {
    return actions$.ofType<AddSponsorAction>(ActionsTypesEnum.ADD_SPONSOR)
        .switchMap((action: AddSponsorAction) => {
            if (action.sponsor._id === null ||
                action.sponsor._id === undefined ||
                action.sponsor._id === "") {
                return Observable.ajax.post(
                    url,
                    action.sponsor,
                    headers
                );
            } else {
                return Observable.ajax.put(
                    url,
                    action.sponsor,
                    headers
                );
            }
        })
        .switchMap(() => {
            return Observable.ajax(requestSettings)
                .map(q => loadSponsorsCompleted(q.response));
        });
}

function deleteSponsorsEpic(actions$: ActionsObservable<Action>): Observable<Action> {
    return actions$.ofType<DeleteSponsorAction>(ActionsTypesEnum.DELETE_SPONSOR)
        .switchMap((action: DeleteSponsorAction) => {
            return Observable.ajax.delete(`${url}${action.documents.join(",")}`);
        })
        .switchMap(() => {
            return Observable.ajax(requestSettings)
                .map(q => fullfilledSponsors(q.response));
        });
}
export {
    loadSponsorsEpic,
    loadSponsorsCompletedEpic,
    addSponsorsEpic, deleteSponsorsEpic
};