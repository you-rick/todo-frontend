import axios from 'axios';
import {authHeader} from "../utils/helpers/auth-helpers";
import {Todo} from "../shared/interfaces/todo.interface";
import {LoginFormInterface} from "../shared/interfaces/login.interface";
import {RegisterFormInterface} from "../shared/interfaces/register.interface";


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});


export const profileAPI = {
    login(creds:LoginFormInterface) {
        console.log(creds);
        return axiosInstance.post(`auth/login`, creds);
    },
    register(data:RegisterFormInterface) {
        return axiosInstance.post(`auth/register`, data);
    },
    me() {
        return axiosInstance.get(`auth/profile`, {headers: authHeader()});
    }
};

export const todoAPI = {
    getTodos() {
        return axiosInstance.get(`todos`, {headers: authHeader()});
    },
    addTodo(data:Todo) {
        return axiosInstance.post(`todos`, data, {headers: authHeader()});
    },
    updateTodo(data:Todo) {
        return axiosInstance.put(`todos/${data._id}`, data, {headers: authHeader()});
    },
    deleteTodo(id:Todo['_id']) {
        return axiosInstance.delete(`todos/${id}`, {headers: authHeader()});
    }

}
