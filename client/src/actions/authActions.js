import { TEST_DISPATCH } from "./types"
import axios from 'axios'
import { getErrors } from '../features/errorSlice'
import { setCurrentUser } from '../features/authSlice'
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from 'jwt-decode'
import { JW_TOKEN } from '../app/constants'

// Register User
export const registerUser = (userData, dispatch, navigate) => {
    
    axios
        .post('/api/users/register', userData)
        .then(() => navigate('/login'))
        .catch(err => dispatch(getErrors(err.response.data)));
}

// Login User
export const loginUser = (userData, dispatch) => {
    
    axios
        .post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            
            //Save token to local storage
            localStorage.setItem(JW_TOKEN, token);

            // Set token to Auth Header
            setAuthToken(token);
            
            //Decode token
            const decodedUserData = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decodedUserData))
        })
        .catch(err => dispatch(getErrors(err.response.data)));
}

export const logoutUser = (dispatch) => {

    // Remove token from local storage
    localStorage.removeItem(JW_TOKEN);
    
    // Clear auth header for future requests
    setAuthToken(false);

    // Set current user to {} which also sets isAuthenticated to false
    dispatch(setCurrentUser({}));
}