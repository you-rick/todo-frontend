import Cookies from "universal-cookie";
import {put, call} from 'redux-saga/effects';
import {appInitWorker} from "./appSagas";
import {profileAPI} from "../../api";
import {toggleIsFetching} from "../appReducer";
import {ApiUserResponseMock, AxiosResponseMock, UserMock} from "../../__test__/mocks";
import {setAuthStatus, setProfileData} from "../profileReducer";
import { cloneableGenerator } from '@redux-saga/testing-utils';

describe('AppSaga', () => {
    // @ts-ignore
    const gen = cloneableGenerator(appInitWorker)();
    const appSaga = gen.clone();
    const cookies = new Cookies();
    let response;

    it('should toggle fetching', () => {
        expect(appSaga.next().value).toEqual(put(toggleIsFetching(true)));
    });

    it('should request Profile if Token exists in Cookies', () => {
        cookies.set('token', 'test');
        response = appSaga.next().value;
        expect(response).toEqual(call(profileAPI.me))
    });

    it('should set profile data and auth if Status response is True', () => {
        const clone = appSaga.clone();
        const apiData = AxiosResponseMock(ApiUserResponseMock(true));
        const response = clone.next(apiData).value;

        expect(response).toEqual(put(setProfileData(UserMock)));
        expect(clone.next().value).toEqual(put(setAuthStatus(true)));
    });

    it('should toggle fetching to false, if Status response is False', () => {
        const clone = appSaga.clone();
        const apiData = AxiosResponseMock(ApiUserResponseMock(false));
        const response = clone.next(apiData).value;

         expect(response).toEqual(put(toggleIsFetching(false)));
    });

    it ('should switch toggle fetching to false, if there is no Cookie', () => {
        cookies.remove('token');
        const clone = gen.clone();
        clone.next();
        expect(clone.next().value).toEqual(put(toggleIsFetching(false)));
    })

});


