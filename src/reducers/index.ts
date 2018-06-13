import { combineReducers, Reducer } from "redux";
import { reducer as formReducer } from "redux-form";
import Store from "../store/store.namespace";
import { countriesReducer, countryFormReducer } from "./countries.reducer";

const rootReducer: Reducer<Store.Types.All> = combineReducers({
    CountryComponent: countriesReducer,
    CountryData: countryFormReducer,
    form: formReducer
});

export default rootReducer;