import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export const postSlice = createSlice({
    name: 'post',
    initialState: { value: initialState },
    reducers: {
        postLoading: (state, action) => {
            state.value.loading = true
        },
        getPosts: (state, action) => {
            state.value.posts = action.payload
            state.value.loading = false
        },
        getPost: (state, action) => {},
        addPost: (state, action) => {
            state.value.posts = [action.payload]
            state.value.loading = false
        },
        deletePost: (state, action) => {
            state.value.posts = []
            state.value.loading = false
        }
    }
})

export const { postLoading, getPosts, getPost, addPost, deletePost } = postSlice.actions

export default postSlice.reducer