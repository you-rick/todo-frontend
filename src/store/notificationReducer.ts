// Actions
export const SET_NOTE = "SET_NOTE";
export const HIDE_NOTE = "HIDE_NOTE";

// Initial Data
export type InitialStateType = {
    msg: any,
    type: string,
    error: boolean,
    success: boolean
}

const initState: InitialStateType = {
    msg: "",
    type: "info",
    error: false,
    success: false
};

const notificationReducer = (state = initState, action: any):InitialStateType => {
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
type setNoteActionType = {
    type: typeof SET_NOTE,
    body: InitialStateType
}
type hideNoteActionType = {
    type: typeof HIDE_NOTE
}


// Action Creators
export const setNote = (body:InitialStateType):setNoteActionType => ({
    type: SET_NOTE,
    body: body
});
export const hideNote = ():hideNoteActionType => ({
    type: HIDE_NOTE
});


export default notificationReducer;
