export interface ApiResponse<T> {
    status?: boolean,
    message?:string,
    token?:string,
    data: Array<T>
}
