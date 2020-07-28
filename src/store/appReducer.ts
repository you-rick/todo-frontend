import {getProfile} from "./profileReducer";

// Actions
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


// Initial Data
export type InitialStateType = {
    initialized: boolean,
    isDataFetching: boolean
}

let initialState: InitialStateType = {
    initialized: false,
    isDataFetching: false
};


const appReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        case TOGGLE_IS_FETCHING: {
            return {...state, isDataFetching: action.isDataFetching}
        }
        default:
            return state;
    }
};

// Action Creators Types
type toggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isDataFetching:boolean
}
type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

// Action Creators
export const toggleIsFetching = (isDataFetching:boolean):toggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isDataFetching
});
export const initializedSuccess = ():initializedSuccessActionType => ({
    type: INITIALIZED_SUCCESS
});


// Thunks
export const initializeApp = () => {
    return (dispatch:any) => {
        let promiseArray = [];
        localStorage.getItem('token') && promiseArray.push(dispatch(getProfile()));
        dispatch(toggleIsFetching(true));

        Promise.all(promiseArray).then(() => {
            setTimeout(() => {
                dispatch(toggleIsFetching(false));
                dispatch(initializedSuccess());
            }, 500);
        });
    }
};


export default appReducer;
