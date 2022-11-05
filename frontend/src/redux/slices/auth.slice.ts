import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { authService, UserRegisterData } from '../../api/auth.api'

export const registerUserThunk = createAsyncThunk(
    'auth/registerUser',
    async (userData: UserRegisterData) => {
        const response = await authService.registerUser(userData)
        console.log('response', response)
        return response.data
    }
)

export interface AuthState {
    isLoading: boolean,
}

const initialState: AuthState = {
    isLoading: true,
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
        })
    },
})

export const { } = authSlice.actions

export default authSlice.reducer