import {takeLatest, put, call} from 'redux-saga/effects';
import {setNote} from "../notificationReducer";
import {reset} from "redux-form";
import {push} from "connected-react-router";
import {profileAPI} from "../../api";
import {AxiosResponse} from "axios";
import {ApiUserResponse} from "../../shared/interfaces/api-response.interface";
import {User} from "../../shared/interfaces/user.interface";
import {
    userRegisterApiAction,
    userLoginApiAction,
    setProfileData,
    API_LOGIN_REQUEST,
    API_REGISTER_REQUEST,
    setAuthStatus,
    userProfileApiAction,
    API_PROFILE_REQUEST,
    profileInitialState,
    API_LOGOUT_REQUEST,
} from "../profileReducer";


// Workers
export function* userRegisterWorker(action: userRegisterApiAction) {
    try {
        const response: AxiosResponse<ApiUserResponse<User>> = yield call(profileAPI.register, action.payload);
        const {message, status} = response?.data;
        if (status) {
            yield put(setNote({msg: message, type: "success", error: false, success: true}));
            yield put(reset('register'));
            yield put(push('/login'));
        }
    } catch (error) {
        console.error(error);
    }
}

export function* userLoginWorker(action: userLoginApiAction) {
    try {
        const response: AxiosResponse<ApiUserResponse<User>> = yield call(profileAPI.login, action.payload);
        const {data, status} = response?.data;
        if (status) {
            yield put(setProfileData(data));
            yield put(setAuthStatus(true));
            yield put(push('/'));
        }
    } catch (error) {
        console.error(error);
    }
}

export function* userProfileWorker(action: userProfileApiAction) {
    try {
        const response: AxiosResponse<ApiUserResponse<User>> = yield call(profileAPI.me);
        const {data, status} = response?.data;
        if (status) {
            yield put(setProfileData(data));
            yield put(setAuthStatus(true));
        }
    } catch (error) {
        console.error(error);
    }
}

export function* userLogoutWorker() {
    try {
        const response: AxiosResponse<any> = yield call(profileAPI.logout);
        const {status} = response?.data;
        if (status) {
            yield put(setAuthStatus(false));
            yield put(setProfileData(profileInitialState));
            yield put(push('/login'));
        }
    } catch (error) {
        console.error(error);
    }
}

// Watchers
export function* userRegisterWatcher() {
    yield takeLatest(API_REGISTER_REQUEST, userRegisterWorker);
}

export function* userLoginWatcher() {
    yield takeLatest(API_LOGIN_REQUEST, userLoginWorker);
}

export function* userProfileWatcher() {
    yield takeLatest(API_PROFILE_REQUEST, userProfileWorker);
}

export function* userLogoutWatcher() {
    yield takeLatest(API_LOGOUT_REQUEST, userLogoutWorker);
}
