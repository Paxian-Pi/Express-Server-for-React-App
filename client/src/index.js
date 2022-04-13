import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import store from './app/store'

// import authReducer from './features/authSlice';
// import errorReducer from './features/errorSlice';

// const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         error: errorReducer
//     }
// });

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
