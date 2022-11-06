import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authService, UserRegisterData } from '../../api/auth.api'

export const registerUserThunk = createAsyncThunk(
    'auth/registerUser',
    async (userData: UserRegisterData) => {
        const response = await authService.registerUser(userData)
        return response.data
    }
)

export interface AuthState {
    isLoading: boolean,
    error: string,
}

const initialState: AuthState = {
    isLoading: false,
    error: '',
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
    },
})

export const { } = authSlice.actions

export default authSlice.reducer