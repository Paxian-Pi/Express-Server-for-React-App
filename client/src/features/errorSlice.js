import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const errorSlice = createSlice({
    name: "error",
    initialState: { value: initialState },
    reducers: {
        getErrors: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { getErrors } = errorSlice.actions;

export default errorSlice.reducer;