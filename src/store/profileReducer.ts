import {User, UserStateInterface} from "../shared/interfaces/user.interface";
import {RegisterFormInterface} from "../shared/interfaces/register.interface";
import {LoginFormInterface} from "../shared/interfaces/login.interface";


// Actions
export const SET_PROFILE_DATA = 'SET_PROFILE_DATA';
export const SET_AUTH_STATUS = 'SET_AUTH_STATUS';
export const API_REGISTER_REQUEST = 'API_REGISTER_REQUEST';
export const API_LOGIN_REQUEST = 'API_LOGIN_REQUEST';
export const API_PROFILE_REQUEST = 'API_PROFILE_REQUEST';
export const API_LOGOUT_REQUEST = 'API_LOGOUT_REQUEST';


// Initial Data
export const profileInitialState: UserStateInterface = {
    _id: null,
    name: null,
    username: null,
    address: null,
    birthday: null,
    phone: null,
    isAuth: false
};

const profileReducer = (state = profileInitialState, action: ProfileActionTypes): UserStateInterface => {
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

export interface userRegisterApiAction {
    type: typeof API_REGISTER_REQUEST,
    payload: RegisterFormInterface
}
export interface userLoginApiAction {
    type: typeof API_LOGIN_REQUEST,
    payload: LoginFormInterface
}
export interface userProfileApiAction {
    type: typeof API_PROFILE_REQUEST
}
export interface userLogoutApiAction {
    type: typeof API_LOGOUT_REQUEST
}

export type ProfileActionTypes = SetAuthStatusAction | SetProfileDataAction;


// Action Creators
export const setProfileData = (data: User): SetProfileDataAction => ({
    type: SET_PROFILE_DATA, data
});
export const setAuthStatus = (isAuth: boolean): SetAuthStatusAction => ({
    type: SET_AUTH_STATUS, isAuth
});
export const register = (payload: RegisterFormInterface): userRegisterApiAction => ({
    type: API_REGISTER_REQUEST, payload
});
export const login = (payload: LoginFormInterface):userLoginApiAction => ({
    type: API_LOGIN_REQUEST, payload
});
export const me = ():userProfileApiAction => ({
    type: API_PROFILE_REQUEST,
});
export const logout = ():userLogoutApiAction => ({
    type: API_LOGOUT_REQUEST,
});

export default profileReducer;
