import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider, Store as ReduxStore } from "react-redux";
import Store from "./store/Store.namespace";
import App from "./components/App.Component";
import configureStore from "./store/ConfigStore";

import { loadCountries } from "./actions/Countries.actions";
import { loadClasifications } from "./actions/Clasifications.actions";

const initialState: Store.Types.All = {
    CountryComponent: Store.CountryComponent,
    SponsorComponent: Store.SponsorComponent,
    ClasificationData: Store.ClasificationComponent,
    CountryData: { country: Store.country },
    SponsorData: { sponsor: Store.sponsorForm },
    ClasificationFormData: { clasification: Store.clasificationForm }
};

const store: ReduxStore<Store.Types.All> = configureStore(initialState);
const ROOT: Element = document.querySelector(".container");

store.dispatch(loadCountries());
store.dispatch(loadClasifications());

ReactDOM.render(<Provider store={store}
><BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>, ROOT);