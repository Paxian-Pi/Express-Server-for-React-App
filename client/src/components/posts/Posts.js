import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostAction } from '../../actions/postActions'
import { showModal } from '../../features/modalSlice'
import ShowModalSingleAction from '../common/ShowModalSingleAction'
import Spinner from '../common/Spinner'
import PostFeed from './PostFeed'
import PostForm from './PostForm'

const Posts = () => {

    const dispatch = useDispatch()

    const { posts, loading } = useSelector((state) => state.post.value)

    const modal = useSelector((state) => state.modal.value)

    const handleClose = () => dispatch(showModal(false))

    let postContent;
    let show_modal;

    useEffect(() => {
        // Load all posts
        getPostAction(dispatch)
    }, [])

    if (posts === null || loading) {
        postContent = <Spinner />
    }
    else {
        postContent = <PostFeed posts={posts} />
    }

    if (modal) {
        show_modal = (
            <ShowModalSingleAction
                show={modal}
                body='Not available now!'
                handler={handleClose}
            />
        )
    }

    return (
        <div>
            <div className="feed">
                <div className="continer">
                    <div className="row">
                        <div className="col-md-12">
                            {show_modal}
                            <PostForm />
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts