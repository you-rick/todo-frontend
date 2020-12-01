import {Todo, TodoStateInterface} from "../shared/interfaces/todo.interface";

// Actions
const SET_TODOS = 'SET_TODOS';
const SET_CURRENT_TODO = 'SET_CURRENT_TODO';
const RESET_CURRENT_TODO = 'RESET_CURRENT_TODO';
export const API_GET_TODOS_REQUEST = 'API_GET_TODOS_REQUEST';
export const API_POST_TODO_REQUEST = 'API_POST_TODO_REQUEST';
export const API_UPDATE_TODO_REQUEST = 'API_UPDATE_TODO_REQUEST';
export const API_DELETE_TODO_REQUEST = 'API_DELETE_TODO_REQUEST';

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
interface getTodosApiAction {
    type: typeof API_GET_TODOS_REQUEST
}
export interface postTodoApiAction {
    type: typeof API_POST_TODO_REQUEST,
    payload: Todo
}
export interface updateTodoApiAction {
    type: typeof API_UPDATE_TODO_REQUEST,
    payload: Todo
}
export interface deleteTodoApiAction {
    type: typeof API_DELETE_TODO_REQUEST,
    payload: Todo['_id']
}

export type TodoActionTypes = SetTodosAction | SetCurrentTodoAction | ResetCurrentTodoAction;

// Action Creators
export const setTodos = (todos:Array<Todo>):SetTodosAction => ({
    type: SET_TODOS, todos
});
export const setCurrentTodo = (data:Todo):SetCurrentTodoAction => ({
    type: SET_CURRENT_TODO, data
});
export const resetCurrentTodo = ():ResetCurrentTodoAction => ({
    type: RESET_CURRENT_TODO
});
export const requestTodos = ():getTodosApiAction => ({
    type: API_GET_TODOS_REQUEST
});
export const postTodo = (payload:Todo):postTodoApiAction => ({
    type: API_POST_TODO_REQUEST, payload
});
export const updateTodo = (payload:Todo):updateTodoApiAction => ({
    type: API_UPDATE_TODO_REQUEST, payload
});
export const deleteTodo = (payload:Todo['_id']):deleteTodoApiAction => ({
    type: API_DELETE_TODO_REQUEST, payload
});



export default todoReducer;
