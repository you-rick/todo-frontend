import {applyMiddleware, compose, createStore} from "redux";
import {routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import reducersGroup from "./reducers";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";

import {AxiosInterceptor} from "../api/interceptor";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

// For Redux Browser Extension
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducersGroup(history),
    composeEnhancers(applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        sagaMiddleware
    ))
);

sagaMiddleware.run(rootSaga);
AxiosInterceptor(store);
// @ts-ignore
window.__store__ = store;

export default store;
