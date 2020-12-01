import axios from 'axios';
import {Todo} from "../shared/interfaces/todo.interface";
import {LoginFormInterface} from "../shared/interfaces/login.interface";
import {RegisterFormInterface} from "../shared/interfaces/register.interface";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
});


export const profileAPI = {
    login(creds: LoginFormInterface) {
        return axiosInstance.post(`auth/login`, creds);
    },
    logout() {
        return axiosInstance.post(`auth/logout`, {});
    },
    register(data: RegisterFormInterface) {
        return axiosInstance.post(`auth/register`, data);
    },
    me() {
        return axiosInstance.get(`auth/profile`);
    }
};

export const todoAPI = {
    getTodos() {
        return axiosInstance.get(`todos`);
    },
    addTodo(data: Todo) {
        return axiosInstance.post(`todos`, data);
    },
    updateTodo(data: Todo) {
        return axiosInstance.put(`todos/${data._id}`, data);
    },
    deleteTodo(id: Todo['_id']) {
        return axiosInstance.delete(`todos/${id}`);
    }

};
