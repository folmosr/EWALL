import { combineReducers, Reducer } from "redux";
import { reducer as formReducer } from "redux-form";
import Store from "../store/store.namespace";
import { countriesReducer, countryFormReducer } from "./countries.reducer";
import { sponsorReducer, sponsorFormReducer } from "./sponsors.reducer";

const rootReducer: Reducer<Store.Types.All> = combineReducers({
    CountryComponent: countriesReducer,
    SponsorComponent: sponsorReducer,
    CountryData: countryFormReducer,
    SponsorData: sponsorFormReducer,
    form: formReducer
});

export default rootReducer;