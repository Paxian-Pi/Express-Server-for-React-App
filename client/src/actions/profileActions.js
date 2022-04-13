import axios from 'axios'
import { clearCurrentProfile, getProfile, profileLoading } from '../features/profileSlice';

// Get current profile
export const getCurrentProfile = (dispatch) => {
    dispatch(profileLoading());

    axios.get('/api/profile')
        .then(res => dispatch(getProfile(res.data)))
        .catch(err => dispatch(getProfile({})));
}

// Profile loading
// export const setProfileLoading = () => {
//     return profileLoading();
// }

// Clear profile
export const clearProfile = (dispatch) => {
    dispatch(clearCurrentProfile());
}