import {toggleIsFetching} from "./appReducer";
import {hideNote, setNote} from "./notificationReducer";
import {todoAPI} from "../api/api";
import {reset} from "redux-form";
import {ApiResponse} from "../shared/interfaces/api-response.interface";
import {AxiosResponse} from "axios";


// Actions
const SET_TODOS = 'SET_TODOS';
const SET_CURRENT_TODO = 'SET_CURRENT_TODO';
const RESET_CURRENT_TODO = 'RESET_CURRENT_TODO';


// Initial Data
export type TodoType = {
    _id: string | null,
    title: string | null,
    status: number,
    author: string | null
}

export type InitialStateType = {
    list: Array<TodoType>,
    currentTodo: TodoType
}

let initialState:InitialStateType = {
    list: [],
    currentTodo: {
        _id: null,
        title: null,
        status: 0,
        author: null
    }
};

const todoReducer = (state = initialState, action:any):InitialStateType => {
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
    todos: Array<TodoType>
}
type setCurrentTodoActionType = {
    type: typeof SET_CURRENT_TODO,
    data: TodoType
}
type resetCurrentTodoActionType = {
    type: typeof RESET_CURRENT_TODO
}

// Action Creators
export const setTodos = (todos:Array<TodoType>):setTodosActionType => ({
    type: SET_TODOS,
    todos
});
export const setCurrentTodo = (data:TodoType):setCurrentTodoActionType => ({
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
            .then((response:AxiosResponse<ApiResponse<TodoType>>) => {
                let res = response.data;
                if (res.status) {
                    dispatch(setTodos(res.data));
                }
            });
    }
};

const handleTodo = (dispatch:any, data:TodoType | TodoType['_id'] , apiMethod:any) => {
    dispatch(toggleIsFetching(true));
    dispatch(hideNote());
    apiMethod(data)
        .then((response:AxiosResponse<ApiResponse<TodoType>>) => {
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

export const postTodo = (data:TodoType) => {
    return (dispatch:any) => {
        handleTodo(dispatch, data, todoAPI.addTodo.bind(todoAPI));
    }
};

export const updateTodo = (data:TodoType) => {
    return (dispatch:any) => {
        handleTodo(dispatch, data, todoAPI.updateTodo.bind(todoAPI));
    }
};

export const deleteTodo = (id:TodoType['_id']) => {
    return (dispatch:any) => {
        handleTodo(dispatch, id, todoAPI.deleteTodo.bind(todoAPI));
    }
};


export default todoReducer;
