import {AxiosResponse} from "axios";
import {ApiUserResponse} from "../shared/interfaces/api-response.interface";
import {User} from "../shared/interfaces/user.interface";

export const AxiosResponseMock = (data: any): AxiosResponse => ({
    data: data,
    status: 0,
    statusText: '',
    headers: null,
    config: {}
});
export const ApiUserResponseMock = (status: boolean): ApiUserResponse<User> => ({
    status: status,
    message: '',
    data: UserMock
});
export const UserMock:User = {
    _id: '1',
    name: 'name',
    username: 'username',
    address: 'address',
    birthday: 'birthday',
    phone: 'phone'
};
