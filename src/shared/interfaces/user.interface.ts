export interface User {
    _id: string | null,
    name: string | null,
    username: string | null,
    address: string | null,
    birthday: string | null,
    phone: string | null
}

export interface UserStateInterface extends User {
    isAuth: boolean
}
