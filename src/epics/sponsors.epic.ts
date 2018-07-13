import { Observable } from "rxjs";
import "rxjs/operators/switchMap";
import { ActionsObservable } from "redux-observable";
import { Action } from "redux";
import ActionsTypesEnum from "../enums/sponsorsActionsTypes.enum";

import { fullfilledSponsors } from "../actions/sponsors.actions";
import { LoadSponsorAction } from "../types/sponsorsActionsTypes";

const url: string = `http://localhost:3000/api/organizations/`;

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

export { loadSponsorsEpic };