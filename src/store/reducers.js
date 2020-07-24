import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import {reducer as formReducer} from "redux-form";

import profileReducer from "./profileReducer";
import notificationReducer from "./notificationReducer";
import todoReducer from "./todoReducer";
import appReducer from "./appReducer";

const reducersGroup = (history) => combineReducers({
    router: connectRouter(history),
    app: appReducer,
    todos: todoReducer,
    notification: notificationReducer,
    profile: profileReducer,
    form: formReducer
});


export default reducersGroup;
