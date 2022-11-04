import axios from "axios";

export type UserRegisterData = {
    username: string,
    email: string,
    password: string,
}

export type RegisterUserResponse = {
    message: string,
}

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
});

export const authService = {
    registerUser(data: UserRegisterData) {
        return instance.post(`/api/register/`, data)
    },
}