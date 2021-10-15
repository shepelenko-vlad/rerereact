import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: '',
}

export const maskContentSlice = createSlice({
    name: 'maskContent',
    initialState,
    reducers: {
        getMaskContent: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { getMaskContent } = maskContentSlice.actions

export default maskContentSlice.reducer