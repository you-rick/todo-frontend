import {setNote} from "./notificationReducer";
import {todoAPI} from "../api/api";
import {reset} from "redux-form";
import {ApiTodoResponse} from "../shared/interfaces/api-response.interface";
import {AxiosResponse} from "axios";
import {Todo, TodoStateInterface} from "../shared/interfaces/todo.interface";
import {AppThunk} from "../shared/interfaces/app-thunk.interface";


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

const todoReducer = (state = initialState, action:TodoActionTypes):TodoStateInterface => {
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
interface SetTodosAction {
    type: typeof SET_TODOS,
    todos: Array<Todo>
}
interface SetCurrentTodoAction {
    type: typeof SET_CURRENT_TODO,
    data: Todo
}
interface ResetCurrentTodoAction {
    type: typeof RESET_CURRENT_TODO
}

export type TodoActionTypes = SetTodosAction | SetCurrentTodoAction | ResetCurrentTodoAction;

// Action Creators
export const setTodos = (todos:Array<Todo>):SetTodosAction => ({
    type: SET_TODOS,
    todos
});
export const setCurrentTodo = (data:Todo):SetCurrentTodoAction => ({
    type: SET_CURRENT_TODO,
    data
});
export const resetCurrentTodo = ():ResetCurrentTodoAction => ({
    type: RESET_CURRENT_TODO
});



// Thunks
export const requestTodos = ():AppThunk => {
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

const _handleTodo = (dispatch:any, data:Todo | Todo['_id'] , apiMethod:any) => {
    apiMethod(data)
        .then((response:AxiosResponse<ApiTodoResponse<Todo>>) => {
            let res = response.data;
            if (res.status) {
                dispatch(setNote({msg: res.message, type: "success", error: false, success: true}));
                dispatch(reset('todos'));
                 dispatch(requestTodos());
                dispatch(resetCurrentTodo());
            } else {
                dispatch(setNote({msg: res.message, type: "error", error: true, success: false}));
            }
        }).catch((error:any) => {
        error.response && dispatch(setNote({
            msg: error.response.data.message,
            type: "error",
            error: true,
            success: false
        }));
    });
};

export const postTodo = (data:Todo):AppThunk => {
    return (dispatch:any) => {
        _handleTodo(dispatch, data, todoAPI.addTodo.bind(todoAPI));
    }
};

export const updateTodo = (data:Todo):AppThunk => {
    return (dispatch:any) => {
        _handleTodo(dispatch, data, todoAPI.updateTodo.bind(todoAPI));
    }
};

export const deleteTodo = (id:Todo['_id']):AppThunk => {
    return (dispatch:any) => {
        _handleTodo(dispatch, id, todoAPI.deleteTodo.bind(todoAPI));
    }
};


export default todoReducer;
