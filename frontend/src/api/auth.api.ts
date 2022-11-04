import axios from "axios";

export type UserRegisterData = {
    username: string,
    email: string,
    password: string,
}

export type RegisterUserResponse = {
    message: string,
}

const instance =  axios.create({
    baseURL: 'localhost:5000',
    withCredentials: true,
});

export const authService = {
    registerUser(data: UserRegisterData) {
        console.log('here', data)
        return instance.post(`/api/register/`, data)
    },
}