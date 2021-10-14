import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const descriptiveCodeIDSlice = createSlice({
    name: 'descriptiveCodeID',
    initialState,
    reducers: {
        getDescriptiveCodeID: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {getDescriptiveCodeID} = descriptiveCodeIDSlice.actions

export default descriptiveCodeIDSlice.reducer