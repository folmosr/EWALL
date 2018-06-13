import { createStore, applyMiddleware, Store as ReduxStore, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";

import rootReducer from "../reducers";
import Store from "./store.namespace";
import rootEpic from "../epics";

const componseEnhancers:any = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState: Store.Types.All): ReduxStore<Store.Types.All> {
    return createStore(rootReducer, initialState, componseEnhancers(applyMiddleware(createEpicMiddleware(rootEpic))));
}