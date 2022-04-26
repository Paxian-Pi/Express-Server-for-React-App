import React from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePostAction } from '../../actions/postActions'

const PostItem = ({ post }) => {

    const auth = useSelector((state) => state.auth.value)

    const dispatch = useDispatch()

    const onPostDeleteHandler = (e) => {
        e.preventDefault()

        deletePostAction(post._id, dispatch)
        window.location.reload()
    }

    return (
        <div className="card card-body mb-3 m-5">
            <div className="row">
                <div className="col-md-2">
                    <a href="profile.html">
                        <img className="rounded-circle d-none d-md-block" src={post.avatar} alt={post.name} />
                    </a>
                    <br />
                    <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{post.text}</p>
                    <button type="button" className="btn btn-light mr-1">
                        <i className="text-info fas fa-thumbs-up"></i>
                        <span className="badge badge-light">{post.likes.length}</span>
                    </button>
                    <button type="button" className="btn btn-light mr-1">
                        <i className="text-secondary fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`/post/${post._id}`} className="btn btn-info mr-1">Comments</Link>
                    {post.user === auth.user.id ?
                        <button onClick={onPostDeleteHandler} type="button" className="btn btn-danger mr-1">
                            <i className="fas fa-times" />
                        </button> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default PostItem