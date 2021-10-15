import { configureStore } from '@reduxjs/toolkit'
import maskIDReducer from './maskIDSlice'
import maskContentReducer from './maskContentSlice'
import descriptiveCodeIDReducer from './descriptiveCodeIDSlice'
import descriptiveCodeNameReducer from './descriptiveCodeNameSlice'

export const store = configureStore({
    reducer: {
        maskID: maskIDReducer,
        maskContent: maskContentReducer,
        descriptiveCodeID: descriptiveCodeIDReducer,
        descriptiveCodeName: descriptiveCodeNameReducer,
    },
})