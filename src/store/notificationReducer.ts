import {NotificationStateInterface} from "../shared/interfaces/notification.interface";

// Actions
export const SET_NOTE = "SET_NOTE";
export const HIDE_NOTE = "HIDE_NOTE";

// Initial Data
const initState: NotificationStateInterface = {
    msg: "",
    type: "info",
    error: false,
    success: false
};

const notificationReducer = (state = initState, action: NotificationActionTypes):NotificationStateInterface => {
    switch (action.type) {
        case SET_NOTE:
            return {...state, ...action.body};
        case HIDE_NOTE:
            return {...state, msg: null, type: "info", error: false, success: false};
        default:
            return state;
    }
};


// Action Creators Types
interface SetNoteAction {
    type: typeof SET_NOTE,
    body: NotificationStateInterface
}
interface HideNoteAction {
    type: typeof HIDE_NOTE
}

export type NotificationActionTypes = SetNoteAction | HideNoteAction;


// Action Creators
export const setNote = (body:NotificationStateInterface):SetNoteAction => ({
    type: SET_NOTE, body
});
export const hideNote = ():HideNoteAction => ({
    type: HIDE_NOTE
});


export default notificationReducer;
