import { combineReducers, Reducer } from "redux";
import { reducer as formReducer } from "redux-form";
import Store from "../store/Store.namespace";
import { countriesReducer, countryFormReducer } from "./Countries.reducer";
import { sponsorReducer, sponsorFormReducer } from "./Sponsors.reducer";
import { clasificationReducer } from "./Clasifications.reducer";

const rootReducer: Reducer<Store.Types.All> = combineReducers({
    CountryComponent: countriesReducer,
    SponsorComponent: sponsorReducer,
    CountryData: countryFormReducer,
    SponsorData: sponsorFormReducer,
    ClasificationData: clasificationReducer,
    form: formReducer
});

export default rootReducer;