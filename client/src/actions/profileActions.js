import axios from 'axios'
// import res from 'express/lib/response';
import ShowModalSingleAction from '../components/common/ShowModalSingleAction';
import { JW_TOKEN } from '../constants';
import { setCurrentUser } from '../features/authSlice';
import { getErrors } from '../features/errorSlice';
import { clearCurrentProfile, getProfile, getProfiles, profileLoading } from '../features/profileSlice';
import setAuthToken from '../utils/setAuthToken';

// Get all profiles
export const getAllProfiles = (dispatch) => {
    dispatch(profileLoading());

    axios
        .get('/api/profile/all')
        .then(res => dispatch(getProfiles(res.data)))
        .catch(err => dispatch(getProfiles(null)));
}

// Get current profile
export const getCurrentProfile = (dispatch) => {
    dispatch(profileLoading());

    axios
        .get('/api/profile')
        .then(res => dispatch(getProfile(res.data)))
        .catch(() => dispatch(getProfile({})));
}

// Get profile by handle
export const getProfileByHandle = (handle, dispatch) => {
    axios
        .get(`/api/profile/handle/${handle}`)
        .then(res => dispatch(getProfile(res.data)))
        .catch(err => dispatch(getProfile(null)));
}

// Create profile
export const createProfile = (profileData, navigate, dispatch) => {
    axios
        .post('/api/profile', profileData)
        .then(() => navigate('/dashboard'))
        .catch(err => dispatch(getErrors(err.response.data)));
}

// Add Experience
export const addExperience = (experienceData, navigate, dispatch) => {
    axios
        .post('/api/profile/experience', experienceData)
        .then(() => navigate('/dashboard'))
        .catch(err => dispatch(getErrors(err.response.data)));
}

// Add Education
export const addEducation = (educationData, navigate, dispatch) => {
    axios
        .post('/api/profile/education', educationData)
        .then(() => navigate('/dashboard'))
        .catch(err => dispatch(getErrors(err.response.data)));
}

// Delete Experience
export const deleteExperience = (id, dispatch) => {
    axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => dispatch(getProfile(res.data)))
        .catch(err => dispatch(getErrors(err.response.data)));
}

// Delete Education
export const deleteEducation = (id, dispatch) => {
    axios
        .delete(`/api/profile/education/${id}`)
        .then(res => dispatch(getProfile(res.data)))
        .catch(err => dispatch(getErrors(err.response.data)));
}

// Delete account & profile
export const deleteAccount = (dispatch) => {
    if (window.confirm('Are you sure?\nThis can NOT be undone!')) {


        axios
            .delete('/api/profile')
            .then(() => {
                // Remove token from local storage
                localStorage.removeItem(JW_TOKEN)

                // Clear auth header for future requests
                setAuthToken(false)

                // Remove account from DB
                dispatch(setCurrentUser({}))

                // Clear the profile data
                dispatch(clearCurrentProfile())
            })
            .catch(err => dispatch(getErrors(err.response.data)));
    }
}

// Clear profile
export const clearProfile = (dispatch) => {
    dispatch(clearCurrentProfile());
}