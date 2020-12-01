import {all} from 'redux-saga/effects';
import {appInitWatcher} from "./appSagas";
import {userRegisterWatcher, userLoginWatcher, userProfileWatcher, userLogoutWatcher} from "./profileSagas";
import {deleteTodoWatcher, postTodoWatcher, requestTodosWatcher, updateTodoWatcher} from "./todoSagas";


export default function* rootSaga() {
    yield all([
        appInitWatcher(),
        userRegisterWatcher(),
        userLoginWatcher(),
        userProfileWatcher(),
        userLogoutWatcher(),
        requestTodosWatcher(),
        postTodoWatcher(),
        updateTodoWatcher(),
        deleteTodoWatcher(),
    ])
}
