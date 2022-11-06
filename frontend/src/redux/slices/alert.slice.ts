import { createSlice } from '@reduxjs/toolkit'

export interface AlertState {
    show: boolean,
    text: string,
}

const initialState: AlertState = {
    show: false,
    text: '',
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, { payload }) => {
            state.show = true
            state.text = payload.text
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