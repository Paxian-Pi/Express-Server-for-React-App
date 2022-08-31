import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getErrors } from '../../features/errorSlice'
import { loginUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import ShowModalSingleAction from '../common/ShowModalSingleAction'


const Login = () => {

    const navigate = useNavigate();
    
    const errors = useSelector((state) => state.error.value)

    const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated);
    console.log(isAuthenticated);

    // Navigate to dashboard on successful login
    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated]);
    
    const dispatch = useDispatch();

    const emailInput = useRef();
    const passwordInput = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const user = {
            email: emailInput.current.value,
            password: passwordInput.current.value
        }

        loginUser(user, dispatch)
        setShow(true)
        dispatch(getErrors({}))
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false)

    let showModal;

    if (errors.error) {
        showModal = (
            <ShowModalSingleAction
                show={show}
                title='Error'
                body={errors.error}
                handler={handleClose}
            />
        )
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your DevConnector account</p>
                        <form onSubmit={submitHandler}>

                            <TextFieldGroup
                                placeholder='Email Address'
                                type='email'
                                name='email'
                                refInput={emailInput}
                                error={errors.email}
                            />

                            <TextFieldGroup
                                placeholder='Password'
                                type='password'
                                name='password'
                                refInput={passwordInput}
                                error={errors.password}
                            />

                            {showModal}

                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login