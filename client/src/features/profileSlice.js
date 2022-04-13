import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    profile: null,
    profiles: null,
    loading: false
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState: { value: initialState },
    reducers: {
        profileLoading: (state, action) => { 
            state.value.loading = true;
        },
        getProfile: (state, action) => { 
            state.value.profile = action.payload;
            state.value.loading = false;
        },
        profileNotFound: (state, action) => { 
            state.value = action.payload;
        },
        clearCurrentProfile: (state, action) => { 
            state.value.profile = null;
        },
        getProfiles: (state, action) => { 
            state.value = action.payload;
        },
    }
});

export const { getProfile, profileLoading, profileNotFound, clearCurrentProfile, getProfiles } = profileSlice.actions;

export default profileSlice.reducer;