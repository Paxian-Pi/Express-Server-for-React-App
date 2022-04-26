import axios from "axios";
import { getErrors } from "../features/errorSlice";
import { addPost, getPost, getPosts, isPostAdded, postLoading } from "../features/postSlice";

// Add Post
export const addPostAction = (postData, dispatch) => {

    axios
        .post('/api/posts', postData)
        .then(res => {
            dispatch(addPost(res.data))
            window.location.reload();
        })
        .catch(err => dispatch(getErrors(err.response.data)));
}

// Get Post
export const getPostAction = (dispatch) => {
    dispatch(postLoading())

    axios
        .get('/api/posts')
        .then(res => dispatch(getPosts(res.data)))
        .catch(err => dispatch(getPosts(null)));
}

// Delete Post
export const deletePostAction = (postId, dispatch) => {
    dispatch(postLoading())

    axios
        .delete(`/api/posts/${postId}`)
        .then(res => dispatch(getPosts(res.data)))
        .catch(err => dispatch(getPosts(null)));
}

