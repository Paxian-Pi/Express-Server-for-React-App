import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostAction } from '../../actions/postActions'
import { showModal } from '../../features/modalSlice'
import ShowModalSingleAction from '../common/ShowModalSingleAction'
import Spinner from '../common/Spinner'
import PostFeed from './PostFeed'
import PostForm from './PostForm'

const Posts = () => {

    const { posts, loading } = useSelector((state) => state.post.value)

    const modal = useSelector((state) => state.modal.value)

    const dispatch = useDispatch()

    useEffect(() => {
        getPostAction(dispatch)
    }, [])

    let postContent;

    if (posts === null || loading) {
        postContent = <Spinner />
    }
    else {
        postContent = <PostFeed posts={posts} />
    }

    // const [show, setShow] = useState(false)
    const handleClose = () => dispatch(showModal(false))

    let show_Modal;

    if (modal) {
        console.log(modal)
        show_Modal = (
            <ShowModalSingleAction
                show={modal}
                body='No available now!'
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
                            {show_Modal}
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