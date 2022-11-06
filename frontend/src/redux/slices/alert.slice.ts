import { createSlice } from '@reduxjs/toolkit'

export interface AlertState {
    show: boolean,
    text: string,
    type: 'success' | 'error',
}

const initialState: AlertState = {
    show: false,
    text: '',
    type: 'success',
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, { payload }) => {
            state.show = true
            state.text = payload.text
            state.type = payload.type
        },
        hideAlert: (state) => {
            state.show = false
            state.text = ''
        }
    },
    extraReducers: (builder) => {
       
    },
})

export const { showAlert, hideAlert } = alertSlice.actions

export default alertSlice.reducer