import {toggleIsFetching} from "./appReducer";
import {profileAPI} from "../api/api";
import {setNote, hideNote} from "./notificationReducer";
import {push} from "connected-react-router";
import {reset} from "redux-form";
import {AxiosResponse} from "axios";
import {ApiUserResponse} from "../shared/interfaces/api-response.interface";
import {User, UserStateInterface} from "../shared/interfaces/user.interface";
import {RegisterFormInterface} from "../shared/interfaces/register.interface";
import {AppThunk} from "../shared/interfaces/app-thunk.interface";
import {LoginFormInterface} from "../shared/interfaces/login.interface";


// Actions
const SET_PROFILE_DATA = 'SET_PROFILE_DATA';
const SET_AUTH_STATUS = 'SET_AUTH_STATUS';


// Initial Data
let initialState:UserStateInterface = {
    _id: null,
    name: null,
    username: null,
    address: null,
    birthday: null,
    phone: null,
    isAuth: false
};

const profileReducer = (state = initialState, action:ProfileActionTypes):UserStateInterface => {
    switch (action.type) {
        case SET_PROFILE_DATA:
            return {...state, ...action.data};
        case SET_AUTH_STATUS:
            return {...state, isAuth: action.isAuth};
        default:
            return state;
    }
};

// Action Creators Types
interface SetProfileDataAction {
    type: typeof SET_PROFILE_DATA,
    data: User
}
interface SetAuthStatusAction {
    type: typeof SET_AUTH_STATUS,
    isAuth: boolean
}

export type ProfileActionTypes = SetAuthStatusAction | SetProfileDataAction;

// Action Creators
export const setProfileData = (data:User):SetProfileDataAction => ({
    type: SET_PROFILE_DATA,
    data
});
export const setAuthStatus = (isAuth:boolean):SetAuthStatusAction => ({
    type: SET_AUTH_STATUS, isAuth
});

// Thunks
export const getProfile = ():AppThunk => {
    return dispatch => {
        profileAPI.me()
            .then((response:AxiosResponse<ApiUserResponse<User>>) => {
                let res = response.data;
                if (res.status) {
                    dispatch(setProfileData(res.data));
                    dispatch(setAuthStatus(true));
                }
            });
    }
};

export const register = (data:RegisterFormInterface):AppThunk => {
    return dispatch => {
        dispatch(toggleIsFetching(true));
        dispatch(hideNote());
        profileAPI.register(data)
            .then((response:AxiosResponse<ApiUserResponse<User>>) => {
                let res = response.data;
                dispatch(toggleIsFetching(false));
                if (res.status) {
                    dispatch(setNote({msg: res.message, type: "success", error: false, success: true}));
                    dispatch(reset('register'));
                    dispatch(push('/login'));
                } else {
                    dispatch(setNote({msg: res.message, type: "error", error: true, success: false}));
                }
            }).catch((error:any) => {
            dispatch(toggleIsFetching(false));
            dispatch(setNote({msg: error.response.data.message, type: "error", error: true, success: false}));
        });
    }
};

export const login = (data:LoginFormInterface):AppThunk => {
    return dispatch => {
        dispatch(toggleIsFetching(true));
        dispatch(hideNote());

        profileAPI.login(data)
            .then((response:AxiosResponse<ApiUserResponse<User>>)  => {
                dispatch(toggleIsFetching(false));
                let res = response.data;
                if (res.status) {
                    res.token && localStorage.setItem('token', res.token);
                    setTimeout(() => {
                        dispatch(getProfile());
                        dispatch(push('/'));
                    }, 100);
                }
            }).catch((error:any) => {
            console.log(error.response);
            dispatch(toggleIsFetching(false));
            dispatch(setNote({msg: error.response.data.message, type: "error", error: true, success: false}));

        });
    }
};

export const logout = ():AppThunk => {
    return dispatch => {
        dispatch(setAuthStatus(false));
        dispatch(setProfileData(initialState));
        localStorage.removeItem('token');
        dispatch(push('/login'));
    }
};

export default profileReducer;
