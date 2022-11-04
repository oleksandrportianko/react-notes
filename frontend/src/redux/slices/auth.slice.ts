import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { authService, UserRegisterData } from '../../api/auth.api'

export const registerUserThunk = createAsyncThunk(
    'auth/registerUser',
    async (userData: UserRegisterData) => {
        console.log(userData)
        const response = await authService.registerUser(userData)
        console.log(response)
        return response.data
    }
)

export interface AuthState {
    value: number
}

const initialState: AuthState = {
    value: 0,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(registerUserThunk.pending, (state, { payload }) => {
            console.log(payload)
        })
        builder.addCase(registerUserThunk.fulfilled, (state, { payload }) => {
            console.log(payload)
        })
        builder.addCase(registerUserThunk.rejected, (state, { payload }) => {
            console.log(payload)
        })
    },
})

export const { } = authSlice.actions

export default authSlice.reducer