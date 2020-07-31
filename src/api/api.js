import * as axios from 'axios';
import {authHeader} from "../utils/helpers/auth-helpers";


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});


export const profileAPI = {
    login(...creds) {
        return axiosInstance.post(`auth/login`, ...creds);
    },
    register(data) {
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
    addTodo(data) {
        return axiosInstance.post(`todos`, data, {headers: authHeader()});
    },
    updateTodo(data) {
        return axiosInstance.put(`todos/${data._id}`, data, {headers: authHeader()});
    },
    deleteTodo(id) {
        return axiosInstance.delete(`todos/${id}`, {headers: authHeader()});
    }

}
