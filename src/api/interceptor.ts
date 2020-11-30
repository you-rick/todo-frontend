import {axiosInstance} from "./api";
import {hideNote, setNote} from "../store/notificationReducer";
import {toggleIsFetching} from "../store/appReducer";
import {AxiosRequestConfig, AxiosResponse} from "axios";

export const AxiosInterceptor = (store: any) => {
    const {dispatch} = store;

    axiosInstance.interceptors.request.use((req:AxiosRequestConfig) => {
        dispatch(hideNote());
        dispatch(toggleIsFetching(true));
        return req;

    }, (error) => {
        dispatch(toggleIsFetching(false));
        return Promise.reject(error).catch((error) => {
            dispatch(setNote({
                msg: error.response?.data.message || 'Request server error',
                type: "error",
                error: true,
                success: false
            }));
        });
    });

    axiosInstance.interceptors.response.use((res:AxiosResponse<any>) => {
        dispatch(toggleIsFetching(false));
        return res;

    }, (error) => {
        dispatch(toggleIsFetching(false));
        return Promise.reject(error).catch((error) => {
            dispatch(setNote({
                msg: error.response?.data.message || 'Response server error',
                type: "error",
                error: true,
                success: false
            }));
        });
    });
};
