import { configureStore } from '@reduxjs/toolkit'
import maskIDReducer from './maskIDSlice'
import descriptiveCodeIDReducer from './descriptiveCodeIDSlice'

export const store = configureStore({
    reducer: {
        maskID: maskIDReducer,
        descriptiveCodeID: descriptiveCodeIDReducer,
    },
})