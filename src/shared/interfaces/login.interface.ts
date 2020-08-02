export interface LoginFormInterface {
    username: string,
    password: string
}

export interface LoginInterface {
    isFetching: boolean,
    isAuth: boolean,
    login: (data:LoginFormInterface) => void
}
