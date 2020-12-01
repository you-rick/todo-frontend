import Cookies from "universal-cookie";
import {put, call} from 'redux-saga/effects';
import {appInitWorker} from "./appSagas";
import {profileAPI} from "../../api";
import {toggleIsFetching} from "../appReducer";

describe('AppSaga', () => {
    const appSaga = appInitWorker();
    const cookies = new Cookies();

    it('should toggle fetching', () => {
        expect(appSaga.next().value).toEqual(put(toggleIsFetching(true)));
    });

    it('should request Profile if Token exists in Cookies', () => {
        cookies.set('token', 'test');
        expect(appSaga.next().value).toEqual(call(profileAPI.me))
    });

});


