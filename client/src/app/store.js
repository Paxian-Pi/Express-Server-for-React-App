import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import errorReducer from '../features/errorSlice'
import profileReducer from '../features/profileSlice'
import postReducer from '../features/postSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        error: errorReducer,
        profile: profileReducer,
        post: postReducer
    }
});

export default store;