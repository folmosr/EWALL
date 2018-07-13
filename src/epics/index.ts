import { combineEpics, Epic } from "redux-observable";

import {
    loadCountriesEpic,
    addCountryEpic,
    deleteCountryEpic
} from "./countries.epic";

import { loadSponsorsEpic } from "./sponsors.epic";

export default combineEpics(
    loadCountriesEpic,
    addCountryEpic,
    deleteCountryEpic,
    loadSponsorsEpic
);