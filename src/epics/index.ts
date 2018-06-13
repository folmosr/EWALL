import { combineEpics, Epic } from "redux-observable";

import { loadCountriesEpic, addCountryEpic } from "./countries.epic";

export default combineEpics(loadCountriesEpic, addCountryEpic);