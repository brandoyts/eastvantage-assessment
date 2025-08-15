export interface Role {
    id: number
    name: string
}

export interface CreateUserForm {
    name: string;
    email: string;
    roles: number[]
}
export interface User {
    id: number
    name: string
    email: string
    roles: Role[]
}