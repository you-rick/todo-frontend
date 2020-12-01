import {takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {reset} from "redux-form";
import {todoAPI} from "../../api";
import {AxiosResponse} from "axios";
import {ApiTodoResponse} from "../../shared/interfaces/api-response.interface";
import {Todo} from "../../shared/interfaces/todo.interface";
import {
    API_DELETE_TODO_REQUEST,
    API_GET_TODOS_REQUEST,
    API_POST_TODO_REQUEST,
    API_UPDATE_TODO_REQUEST,
    deleteTodoApiAction,
    updateTodoApiAction,
    postTodoApiAction,
    requestTodos,
    resetCurrentTodo,
    setTodos,
} from "../todoReducer";
import {setNote} from "../notificationReducer";

// TodoHandler
function* todoHandler(response: AxiosResponse<ApiTodoResponse<Todo>>) {
    const {status, message} = response?.data;
    if (status) {
        yield put(reset('todos'));
        yield put(resetCurrentTodo());
        yield put(requestTodos());
        yield put(setNote({msg: message, type: "success", error: false, success: true}));
    }
}

// Workers
export function* requestTodosWorker() {
    try {
        const response: AxiosResponse<ApiTodoResponse<Todo>> = yield call(todoAPI.getTodos);
        const {data, status} = response?.data;
        if (status) {
            yield put(setTodos(data));
        }
    } catch (error) {
        console.error(error);
    }
}

export function* postTodoWorker(action: postTodoApiAction) {
    try {
        const response: AxiosResponse<ApiTodoResponse<Todo>> = yield call(todoAPI.addTodo, action.payload);
        yield call(todoHandler, response);
    } catch (error) {
        console.error(error);
    }
}

export function* updateTodoWorker(action: updateTodoApiAction) {
    try {
        const response: AxiosResponse<ApiTodoResponse<Todo>> = yield call(todoAPI.updateTodo, action.payload);
        yield call(todoHandler, response);
    } catch (error) {
        console.error(error);
    }
}

export function* deleteTodoWorker(action: deleteTodoApiAction) {
    try {
        const response: AxiosResponse<ApiTodoResponse<Todo>> = yield call(todoAPI.deleteTodo, action.payload);
        yield call(todoHandler, response);
    } catch (error) {
        console.error(error);
    }
}


// Watchers
export function* requestTodosWatcher() {
    yield takeLatest(API_GET_TODOS_REQUEST, requestTodosWorker);
}

export function* postTodoWatcher() {
    yield takeEvery(API_POST_TODO_REQUEST, postTodoWorker);
}

export function* updateTodoWatcher() {
    yield takeEvery(API_UPDATE_TODO_REQUEST, updateTodoWorker);
}

export function* deleteTodoWatcher() {
    yield takeEvery(API_DELETE_TODO_REQUEST, deleteTodoWorker);
}
