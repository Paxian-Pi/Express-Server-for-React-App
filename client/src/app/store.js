import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import errorReducer from '../features/errorSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        error: errorReducer
    }
});

export default store;