import {RouterState} from "connected-react-router";
import {AppStateInterface} from "./app.interface";
import {TodoStateInterface} from "./todo.interface";
import {NotificationStateInterface} from "./notification.interface";
import {UserStateInterface} from "./user.interface";
import {FormState} from "redux-form";

export interface RootStateInterface {
    router: RouterState,
    app: AppStateInterface,
    todos: TodoStateInterface,
    notification: NotificationStateInterface,
    profile: UserStateInterface,
    form: FormState
}
