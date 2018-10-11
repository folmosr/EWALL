import { Observable } from "rxjs";
import "rxjs/operators/switchMap";
import { ActionsObservable } from "redux-observable";
import { Action } from "redux";

import { fullfilledCountries } from "../actions/Countries.actions";
import { LoadCountryAction, AddCountryAction, DeleteCountryAction } from "../types/Countries.actions.types";
import ActionsTypesEnum from "../enums/Countries.actions.types.enum";


const url: string = `http://localhost:3000/api/countries/`;
const setUrlRemoveById:(param:string)=> string = (_id:string)=> `http://localhost:3000/api/countries/${_id}`;

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
                .map(q => fullfilledCountries(q.response));
        });
}

function deleteCountryEpic(actions$: ActionsObservable<Action>): Observable<Action> {
    return actions$.ofType<DeleteCountryAction>(ActionsTypesEnum.DELETE_COUNTRY)
        .switchMap((action: DeleteCountryAction) => {
            return Observable.ajax.delete(
                setUrlRemoveById(action.country._id)
            );
        })
        .switchMap(() => {
            return Observable.ajax(requestSettings)
                .map(q => fullfilledCountries(q.response));
        });
}
export { loadCountriesEpic, addCountryEpic, deleteCountryEpic };