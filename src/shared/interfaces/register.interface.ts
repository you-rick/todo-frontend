export interface RegisterFormInterface {
    username: string,
    name: string,
    password: string,
    repeatPassword: string,
    phone: string,
    birthday: string | null,
    address: string | null
}

export interface RegisterInterface {
    isAuth: boolean,
    register: (data:RegisterFormInterface) => void
}
