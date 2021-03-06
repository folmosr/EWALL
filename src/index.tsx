import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider, Store as ReduxStore } from "react-redux";
import ICountry from "./interfaces/country.interfaces";
import Store from "./store/store.namespace";
import App from "./components/App.Component";
import configureStore from "./store/configStore";

const initialState: Store.Types.All = {
    CountryComponent: Store.CountryComponent,
    CountryData: Store.country
};

const store: ReduxStore<Store.Types.All> = configureStore(initialState);

const ROOT: Element = document.querySelector(".container");

ReactDOM.render(<Provider store={store}
><BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>, ROOT);