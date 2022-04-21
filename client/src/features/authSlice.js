import { TEST_DISPATCH } from "../actions/types";
import { createSlice } from '@reduxjs/toolkit'
import isEmpty from '../validation/is-empty'

const initialState = {
    isAuthenticated: false,
    user: {}
}

// export default function (state = initialState, action) {
//     switch (action.type) {
//         case TEST_DISPATCH:
//             return {...state, user: action.payload}
//         default:
//             return state;
//     }
// }

export const authSlice = createSlice({
    name: "auth",
    initialState: { value: initialState },
    reducers: {

        setCurrentUser: (state, action) => {
            state.value.isAuthenticated = !isEmpty(action.payload)
            state.value.user = action.payload
        }
    }
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;