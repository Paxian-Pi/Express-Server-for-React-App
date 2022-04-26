import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPostAction } from '../../actions/postActions'
import { getErrors } from '../../features/errorSlice'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

const PostForm = () => {

    const [postText, setPostText] = useState('')

    const { user } = useSelector((state) => state.auth.value)

    const errors = useSelector(state => state.error.value)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const newPost = {
            text: postText,
            name: user.name,
            avatar: user.avatar
        }

        addPostAction(newPost, dispatch)
        setPostText('')
        dispatch(getErrors({}))
    }

    return (
        <div className="post-form mb-3">
            <div className="card card-info m-5">
                <div className="card-header bg-info text-white">
                    Say Somthing...
                </div>
                <div className="card-body">
                    <form onSubmit={onSubmitHandler}>
                        <div className="form-group">
                            <TextAreaFieldGroup
                                placeholder='Create a post'
                                name='text'
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                                error={errors.text}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostForm