import { combineEpics, Epic } from "redux-observable";

import {
    loadCountriesEpic,
    addCountryEpic,
    deleteCountryEpic
} from "./countries.epic";
import { deleteCountry } from "../actions/countries.actions";

export default combineEpics(loadCountriesEpic, addCountryEpic, deleteCountryEpic);