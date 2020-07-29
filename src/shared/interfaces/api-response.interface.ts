export interface ApiTodoResponse<T> {
    status?: boolean,
    message?:string,
    data: Array<T>
}

export interface ApiUserResponse<T> {
    status?: boolean,
    message?:string,
    token?:string,
    data: T
}
