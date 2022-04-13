import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import errorReducer from '../features/errorSlice'
import profileReducer from '../features/profileSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        error: errorReducer,
        profile: profileReducer
    }
});

export default store;