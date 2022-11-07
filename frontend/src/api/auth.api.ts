import axios from "axios";

export type UserRegisterData = {
    username: string,
    email: string,
    password: string,
}

export type UserLoginData = {
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
    loginUser(data: UserLoginData) {
        return instance.post(`api/login/`, data)
    },
    getUser(token: string) {
        return instance.get(`api/user/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    getNewAccessToken(refreshToken: string) {
        return instance.post(`/api/get_new_access_token/`, { refreshToken: refreshToken })
    },
}