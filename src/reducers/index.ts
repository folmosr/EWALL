import { combineReducers, Reducer } from "redux";
import { reducer as formReducer } from "redux-form";
import Store from "../store/Store.namespace";
import { countriesReducer, countryFormReducer } from "./Countries.reducer";
import { sponsorReducer, sponsorFormReducer } from "./Sponsors.reducer";
import { clasificationReducer, clasificationFormReducer } from "./Clasifications.reducer";
import { eventFormReducer } from "./Events.reducer";

const rootReducer: Reducer<Store.Types.All> = combineReducers({
    CountryComponent: countriesReducer,
    SponsorComponent: sponsorReducer,
    CountryData: countryFormReducer,
    SponsorData: sponsorFormReducer,
    ClasificationData: clasificationReducer,
    ClasificationFormData: clasificationFormReducer,
    EventData: eventFormReducer, 
    form: formReducer
});

export default rootReducer;