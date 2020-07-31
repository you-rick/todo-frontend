import {combineReducers} from "redux";
import {connectRouter, RouterState} from "connected-react-router";
import {reducer as formReducer, FormState} from "redux-form";
import {History} from "history";

import profileReducer from "./profileReducer";
import notificationReducer from "./notificationReducer";
import todoReducer from "./todoReducer";
import appReducer from "./appReducer";

import {NotificationStateInterface} from "../shared/interfaces/notification.interface";
import {AppStateInterface} from "../shared/interfaces/app.interface";
import {TodoStateInterface} from "../shared/interfaces/todo.interface";
import {UserStateInterface} from "../shared/interfaces/user.interface";

const reducersGroup = (history:History) => combineReducers({
    router: connectRouter(history),
    app: appReducer,
    todos: todoReducer,
    notification: notificationReducer,
    profile: profileReducer,
    form: formReducer
});

export interface RootStateInterface {
    router: RouterState,
    app: AppStateInterface,
    todos: TodoStateInterface,
    notification: NotificationStateInterface,
    profile: UserStateInterface,
    form: FormState
}

export default reducersGroup;
