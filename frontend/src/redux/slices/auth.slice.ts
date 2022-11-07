import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authService, UserLoginData, UserRegisterData } from '../../api/auth.api'
import Cookies from 'universal-cookie';

type User = {
    username: string,
    email: string,
    id: string,
}

export const registerUserThunk = createAsyncThunk(
    'auth/registerUser',
    async (userData: UserRegisterData) => {
        const response = await authService.registerUser(userData)
        return response.data
    }
)

export const loginUserThunk = createAsyncThunk(
    'auth/loginUser',
    async (userData: UserLoginData) => {
        const cookies = new Cookies()
        const response = await authService.loginUser(userData)
        cookies.set('accessToken', response.data.accessToken)
        cookies.set('refreshToken', response.data.refreshToken)
        const userResponse = await authService.getUser(response.data.accessToken)
        return userResponse.data
    }
)

export const getUserThunk = createAsyncThunk(
    'auth/getUser',
    async () => {
        const cookies = new Cookies()
        const accessToken = cookies.get('accessToken')
        const refreshToken = cookies.get('refreshToken')
        if (accessToken) {
            const response = await authService.getUser(accessToken)
            return response
        } else if (!accessToken && refreshToken) {
            const responseRefresh = await authService.getNewAccessToken(refreshToken)
            const response = await authService.getUser(responseRefresh.data.refreshToken)
            return response
        } else {
            console.log('user login tilt')
        }
    }
)

export const logoutUserThunk = createAsyncThunk(
    'auth/logout',
    async () => {
        const cookies = new Cookies()
        cookies.remove('accessToken')
        cookies.remove('refershToken')
        return true
    }
)

export interface AuthState {
    isLoading: boolean,
    error: string,
    isAuth: boolean,
    user: User | null,
}

const initialState: AuthState = {
    isLoading: false,
    error: '',
    isAuth: false,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(registerUserThunk.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(registerUserThunk.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(registerUserThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = 'Error when register user'
        })
        builder.addCase(loginUserThunk.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuth = true
            state.user = action.payload.user
        })
        builder.addCase(loginUserThunk.rejected, (state, action) => {
            state.isLoading = false
            state.user = null
            state.error = 'Error when login user'
        })
        builder.addCase(getUserThunk.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getUserThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload?.data.user
        })
        builder.addCase(getUserThunk.rejected, (state, action) => {
            state.isLoading = false
            state.isAuth = false
            state.user = null
            state.error = 'Error when get user'
        })
        builder.addCase(logoutUserThunk.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = null
            state.isAuth = false
        })
        builder.addCase(logoutUserThunk.rejected, (state, action) => {
            state.isLoading = false
            state.isAuth = false
            state.user = null
            state.error = 'Error when logout user'
        })
    },
})

export const { } = authSlice.actions

export default authSlice.reducer