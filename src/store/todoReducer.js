import {toggleIsFetching} from "./appReducer";
import {hideNote, setNote} from "./notificationReducer";
import {todoAPI} from "../api/api";
import {reset} from "redux-form";

// Actions
const SET_TODOS = 'SET_TODOS';
const SET_CURRENT_TODO = 'SET_CURRENT_TODO';
const RESET_CURRENT_TODO = 'RESET_CURRENT_TODO';

// Initial Data
let initialState = {
    list: [],
    currentTodo: {
        _id: null,
        title: null,
        status: 0,
        author: null
    }
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOS:
            return {...state, list: action.todos};
        case SET_CURRENT_TODO:
            return {...state, currentTodo: action.data};
        case RESET_CURRENT_TODO:
            return {...state, currentTodo: initialState.currentTodo};
        default:
            return state;
    }
};

// Action Creators
export const setTodos = (todos) => ({type: SET_TODOS, todos});
export const setCurrentTodo = (data) => ({type: SET_CURRENT_TODO, data});
export const resetCurrentTodo = () => ({type: RESET_CURRENT_TODO});

// Thunks
export const requestTodos = () => {
    return (dispatch) => {
        todoAPI.getTodos()
            .then(response => {
                if (response.status) {
                    dispatch(setTodos(response.data));
                }
            });
    }
};

const handleTodo = (dispatch, data, apiMethod) => {
    dispatch(toggleIsFetching(true));
    dispatch(hideNote());
    apiMethod(data)
        .then(response => {
            let res = response.data;
            dispatch(toggleIsFetching(false));
            if (res.status) {
                dispatch(setNote({msg: res.message, type: "success", error: false, success: true}));
                dispatch(reset('todos'));
                 dispatch(requestTodos());
                dispatch(resetCurrentTodo());
            } else {
                dispatch(setNote({msg: res.message, type: "error", error: true, success: false}));
            }
        }).catch(error => {
        dispatch(toggleIsFetching(false));
        error.response && dispatch(setNote({
            msg: error.response.data.message,
            type: "error",
            error: true,
            success: false
        }));
    });
};

export const postTodo = (data) => {
    return (dispatch) => {
        handleTodo(dispatch, data, todoAPI.addTodo.bind(todoAPI));
    }
};

export const updateTodo = (data) => {
    return (dispatch) => {
        handleTodo(dispatch, data, todoAPI.updateTodo.bind(todoAPI));
    }
};

export const deleteTodo = (id) => {
    return (dispatch) => {
        handleTodo(dispatch, id, todoAPI.deleteTodo.bind(todoAPI));
    }
};


export default todoReducer;
