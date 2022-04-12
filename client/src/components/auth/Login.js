import React, { useEffect } from 'react'
import { useRef } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getErrors } from '../../features/errorSlice'
import { loginUser } from '../../actions/authActions'

function Login() {


    const navigate = useNavigate();

    const errors = useSelector((state) => state.error.value);

    const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated);
    console.log(isAuthenticated);

    // Navigate to dashboard on successful login
    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated]);

    const dispatch = useDispatch();

    const emailInput = useRef();
    const passwordInput = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const user = {
            email: emailInput.current.value,
            password: passwordInput.current.value
        }

        loginUser(user, dispatch);
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your DevConnector account</p>
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className={classnames("form-control form-control-lg", { "is-invalid": errors.email })}
                                    placeholder="Email Address"
                                    name="email"
                                    ref={emailInput}
                                />
                                {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", { "is-invalid": errors.password })}
                                    placeholder="Password"
                                    name="password"
                                    ref={passwordInput}
                                />
                                {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login