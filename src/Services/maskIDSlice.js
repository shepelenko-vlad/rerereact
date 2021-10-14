import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const maskIDSlice = createSlice({
    name: 'maskID',
    initialState,
    reducers: {
        getMaskID: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { getMaskID } = maskIDSlice.actions

export default maskIDSlice.reducer