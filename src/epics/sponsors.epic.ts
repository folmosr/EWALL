import { Observable } from "rxjs";
import "rxjs/operators/switchMap";
import { ActionsObservable } from "redux-observable";
import { Action } from "redux";
import ActionsTypesEnum from "../enums/Sponsors.actions.types.enum";

import { fullfilledSponsors } from "../actions/Sponsors.actions";
import {
    LoadSponsorAction,
    AddSponsorAction,
    DeleteSponsorAction
} from "../types/Sponsors.actions.types";

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
                .map(q => fullfilledSponsors(q.response));
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
export { loadSponsorsEpic, addSponsorsEpic, deleteSponsorsEpic };