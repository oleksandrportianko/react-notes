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
        builder.addCase(registerUserThunk.pending, (state, action) => {
            console.log('pending', action)
        })
        builder.addCase(registerUserThunk.fulfilled, (state, action) => {
            console.log('fulfilled', action)
        })
        builder.addCase(registerUserThunk.rejected, (state, action) => {
            console.log('rejected', action)
        })
    },
})

export const { } = authSlice.actions

export default authSlice.reducer