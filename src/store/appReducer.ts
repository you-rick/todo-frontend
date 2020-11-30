import {AppStateInterface} from "../shared/interfaces/app.interface";

// Actions
export const INITIALIZE_APP = 'INITIALIZE_APP';
export const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
export const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


// Initial Data
const initialState: AppStateInterface = {
    initialized: false,
    isDataFetching: false
};


const appReducer = (state = initialState, action: AppActionTypes): AppStateInterface => {
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
    isDataFetching: boolean
}
interface InitializedSuccessAction {
    type: typeof INITIALIZED_SUCCESS
}
interface initializeAppAction {
    type: typeof INITIALIZE_APP
}

export type AppActionTypes = ToggleIsFetchingAction | InitializedSuccessAction | initializeAppAction;


// Action Creators
export const toggleIsFetching = (isDataFetching: boolean): ToggleIsFetchingAction => ({
    type: TOGGLE_IS_FETCHING,
    isDataFetching
});
export const initializedSuccess = (): InitializedSuccessAction => ({
    type: INITIALIZED_SUCCESS
});
export const initializeApp = (): initializeAppAction => ({
    type: INITIALIZE_APP
});


export default appReducer;
