import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import authReducer from './slices/auth.slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, thunkMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch