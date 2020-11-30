import {all} from 'redux-saga/effects';
import {appInitWatcher} from "./appSagas";
import {userRegisterWatcher, userLoginWatcher, userProfileWatcher, userLogoutWatcher} from "./profileSagas";


export default function* rootSaga() {
    yield all([
        appInitWatcher(),
        userRegisterWatcher(),
        userLoginWatcher(),
        userProfileWatcher(),
        userLogoutWatcher(),
    ])
}
