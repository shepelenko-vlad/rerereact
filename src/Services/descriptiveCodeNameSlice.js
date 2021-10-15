import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: '',
}

export const descriptiveCodeNameSlice = createSlice({
    name: 'descriptiveCodeName',
    initialState,
    reducers: {
        getDescriptiveCodeName: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { getDescriptiveCodeName } = descriptiveCodeNameSlice.actions

export default descriptiveCodeNameSlice.reducer