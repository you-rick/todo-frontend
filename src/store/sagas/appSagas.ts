import {takeEvery, put, call} from 'redux-saga/effects';
import Cookies from "universal-cookie";
import {initializedSuccess, toggleIsFetching, INITIALIZE_APP} from "../appReducer";
import {profileAPI} from "../../api";
import {AxiosResponse} from "axios";
import {ApiUserResponse} from "../../shared/interfaces/api-response.interface";
import {User} from "../../shared/interfaces/user.interface";
import {setAuthStatus, setProfileData} from "../profileReducer";

const cookies = new Cookies();
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Workers
export function* appInitWorker() {
    yield put(toggleIsFetching(true));
    const isToken = cookies.get('token');
    if (isToken) {
        const response: AxiosResponse<ApiUserResponse<User>> = yield call(profileAPI.me);
        const {status, data} = response.data;
        if (status) {
            yield put(setProfileData(data));
            yield put(setAuthStatus(true));
        }
    }
    yield put(toggleIsFetching(false));
    yield call(delay, 500);
    yield put(initializedSuccess());
}

// Watchers
export function* appInitWatcher() {
    yield takeEvery(INITIALIZE_APP, appInitWorker);
}
