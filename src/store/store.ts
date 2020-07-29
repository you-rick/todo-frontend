import {applyMiddleware, compose, createStore} from "redux";
import {routerMiddleware} from "connected-react-router";

import thunkMiddleware from "redux-thunk";
import {createBrowserHistory} from "history";
import reducersGroup from "./reducers";

export const history = createBrowserHistory();

// For Redux Browser Extension
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducersGroup(history),
    composeEnhancers(applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware
    ))
);
// @ts-ignore
window.__store__ = store;

export default store;
