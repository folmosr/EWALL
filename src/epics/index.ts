import { combineEpics, Epic } from "redux-observable";

import {
    loadCountriesEpic,
    addCountryEpic,
    deleteCountryEpic
} from "./Countries.epic";

import {
    loadSponsorsEpic,
    addSponsorsEpic,
    deleteSponsorsEpic
} from "./Sponsors.epic";

import { 
    loadClasificationsEpic,
    addClasificationEpic
} from "./Clasifications.epic"

export default combineEpics(
    loadCountriesEpic,
    addCountryEpic,
    deleteCountryEpic,
    loadSponsorsEpic,
    addSponsorsEpic,
    deleteSponsorsEpic,
    loadClasificationsEpic,
    addClasificationEpic
);