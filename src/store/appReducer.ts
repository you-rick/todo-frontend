import {getProfile} from "./profileReducer";
import {AppStateInterface} from "../shared/interfaces/app.interface";

// Actions
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


// Initial Data
let initialState: AppStateInterface = {
    initialized: false,
    isDataFetching: false
};


const appReducer = (state = initialState, action:AppActionTypes):AppStateInterface => {
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
interface ToggleIsFetchingAction {
    type: typeof TOGGLE_IS_FETCHING,
    isDataFetching:boolean
}
interface InitializedSuccessAction {
    type: typeof INITIALIZED_SUCCESS
}

export type AppActionTypes = ToggleIsFetchingAction | InitializedSuccessAction;

// Action Creators
export const toggleIsFetching = (isDataFetching:boolean):ToggleIsFetchingAction => ({
    type: TOGGLE_IS_FETCHING,
    isDataFetching
});
export const initializedSuccess = ():InitializedSuccessAction => ({
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
