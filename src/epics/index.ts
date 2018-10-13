import { combineEpics } from "redux-observable";

import {
    loadCountriesEpic,
    loadCountriesCompletedEpic,
    addCountryEpic,
    deleteCountryEpic
} from "./Countries.epic";

import {
    loadSponsorsEpic,
    loadSponsorsCompletedEpic,
    addSponsorsEpic,
    deleteSponsorsEpic
} from "./Sponsors.epic";

import { 
    loadClasificationsEpic,
    loadClasificationsCompletedEpic,
    addClasificationEpic,
    deleteClasificationEpic
} from "./Clasifications.epic"

export default combineEpics(
    loadCountriesEpic,
    loadCountriesCompletedEpic,
    addCountryEpic,
    deleteCountryEpic,
    loadSponsorsEpic,
    loadSponsorsCompletedEpic,
    addSponsorsEpic,
    deleteSponsorsEpic,
    loadClasificationsEpic,
    loadClasificationsCompletedEpic,
    addClasificationEpic,
    deleteClasificationEpic
);