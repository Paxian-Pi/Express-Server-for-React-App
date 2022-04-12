import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../features/authSlice'
import { getErrors } from '../../features/errorSlice'

function Register(props) {

    // const [name, setName] = useState();
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    // const [password2, setPassword2] = useState();

    // const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const errors = useSelector((state) => state.error.value);

    const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated);

    // Prevent veto navigtion to either Login or Register page, if isAuthenticated
    useEffect(() => {
        if(isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated]);

    const dispatch = useDispatch();

    const nameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const password2Input = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const newUser = {
            name: nameInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
            password2: password2Input.current.value
        }

        // dispatch(register(newUser));

        registerUser(newUser, dispatch, navigate);

        // axios
        //     .post('/api/users/register', newUser)
        //     .then(res => navigate('/login'))
        //     .catch(err => dispatch(getErrors(err.response.data)));
    }

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form noValidate onSubmit={submitHandler}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    // Do 'npm install classnames' for  conditionals on 'className'
                                    className={classnames("form-control form-control-lg", { "is-invalid": errors.name })}
                                    placeholder="Name"
                                    name="name"
                                    // value={name}
                                    // onChange={(e) => setName(e.target.value)}
                                    ref={nameInput}
                                />
                                {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className={classnames("form-control form-control-lg", { "is-invalid": errors.email })}
                                    placeholder="Email Address"
                                    name="email"
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    ref={emailInput}
                                />
                                {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", { "is-invalid": errors.password })}
                                    placeholder="Password"
                                    name="password"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                    ref={passwordInput}
                                />
                                {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", { "is-invalid": errors.password2 })}
                                    placeholder="Confirm Password"
                                    name="password2"
                                    // value={password2}
                                    // onChange={(e) => setPassword2(e.target.value)}
                                    ref={password2Input}
                                />
                                {errors.password2 && (<div className='invalid-feedback'>{errors.password2}</div>)}
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Register.propTypes = {
//     registeruser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//     auth: state.auth
// });

// export default connect(mapStateToProps, { registeruser })(Register)

export default Register;