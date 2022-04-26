import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostAction } from '../../actions/postActions'
import Spinner from '../common/Spinner'
import PostFeed from './PostFeed'
import PostForm from './PostForm'

const Posts = () => {

    const { posts, loading } = useSelector((state) => state.post.value)

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

    return (
        <div>
            <div className="feed">
                <div className="continer">
                    <div className="row">
                        <div className="col-md-12">
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