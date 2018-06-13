import { Observable } from "rxjs";
import "rxjs/operators/switchMap";
import { ofType, ActionsObservable } from "redux-observable";
import { Action } from "redux";

import { fullfilledCountries, updatedCountries } from "../actions/countries.actions";
import { LoadCountryAction, AddCountryAction } from "../types/countries.actions.type";
import ActionsTypesEnum from "../enums/actionstypes.enum";
import { isNullOrUndefined } from "util";


const url: string = `http://localhost:3000/api/countries/`;

const requestSettings: any = {
    url,
    crossDomain: true
};

function loadCountriesEpic(actions$: ActionsObservable<Action>): Observable<Action> {
    return actions$.ofType<LoadCountryAction>(ActionsTypesEnum.LOAD_COUNTRIES)
        .switchMap(() => {
            return Observable.ajax(requestSettings)
                .map(q => fullfilledCountries(q.response));
        });
}
function addCountryEpic(actions$: ActionsObservable<Action>): Observable<Action> {
    return actions$.ofType<AddCountryAction>(ActionsTypesEnum.ADD_COUNTRY)
        .switchMap((action: AddCountryAction) => {
            if (action.country._id === null ||
                action.country._id === undefined ||
                action.country._id === "") {
                return Observable.ajax.post(
                    url,
                    action.country
                );
            } else {
                return Observable.ajax.put(
                    url,
                    {
                        id: action.country._id,
                        name: action.country.name,
                        currency: action.country.currency,
                        code: action.country.code
                    }
                );
            }
        })
        .switchMap(() => {
            return Observable.ajax(requestSettings)
                .map(q => updatedCountries(q.response));
        });
}

export { loadCountriesEpic, addCountryEpic };