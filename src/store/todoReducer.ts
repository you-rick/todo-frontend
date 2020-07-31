import {toggleIsFetching} from "./appReducer";
import {hideNote, setNote} from "./notificationReducer";
import {todoAPI} from "../api/api";
import {reset} from "redux-form";
import {ApiTodoResponse} from "../shared/interfaces/api-response.interface";
import {AxiosResponse} from "axios";
import {Todo, TodoStateInterface} from "../shared/interfaces/todo.interface";


// Actions
const SET_TODOS = 'SET_TODOS';
const SET_CURRENT_TODO = 'SET_CURRENT_TODO';
const RESET_CURRENT_TODO = 'RESET_CURRENT_TODO';

// Initial Data
let initialState:TodoStateInterface = {
    list: [],
    currentTodo: {
        _id: null,
        title: null,
        status: 0,
        author: null
    }
};

const todoReducer = (state = initialState, action:any):TodoStateInterface => {
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

// Action Creators Types
type setTodosActionType = {
    type: typeof SET_TODOS,
    todos: Array<Todo>
}
type setCurrentTodoActionType = {
    type: typeof SET_CURRENT_TODO,
    data: Todo
}
type resetCurrentTodoActionType = {
    type: typeof RESET_CURRENT_TODO
}

// Action Creators
export const setTodos = (todos:Array<Todo>):setTodosActionType => ({
    type: SET_TODOS,
    todos
});
export const setCurrentTodo = (data:Todo):setCurrentTodoActionType => ({
    type: SET_CURRENT_TODO,
    data
});
export const resetCurrentTodo = ():resetCurrentTodoActionType => ({
    type: RESET_CURRENT_TODO
});



// Thunks
export const requestTodos = () => {
    return (dispatch:any) => {
        todoAPI.getTodos()
            .then((response:AxiosResponse<ApiTodoResponse<Todo>>) => {
                let res = response.data;
                if (res.status) {
                    dispatch(setTodos(res.data));
                }
            });
    }
};

const handleTodo = (dispatch:any, data:Todo | Todo['_id'] , apiMethod:any) => {
    dispatch(toggleIsFetching(true));
    dispatch(hideNote());
    apiMethod(data)
        .then((response:AxiosResponse<ApiTodoResponse<Todo>>) => {
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
        }).catch((error:any) => {
        dispatch(toggleIsFetching(false));
        error.response && dispatch(setNote({
            msg: error.response.data.message,
            type: "error",
            error: true,
            success: false
        }));
    });
};

export const postTodo = (data:Todo) => {
    return (dispatch:any) => {
        handleTodo(dispatch, data, todoAPI.addTodo.bind(todoAPI));
    }
};

export const updateTodo = (data:Todo) => {
    return (dispatch:any) => {
        handleTodo(dispatch, data, todoAPI.updateTodo.bind(todoAPI));
    }
};

export const deleteTodo = (id:Todo['_id']) => {
    return (dispatch:any) => {
        handleTodo(dispatch, id, todoAPI.deleteTodo.bind(todoAPI));
    }
};


export default todoReducer;
