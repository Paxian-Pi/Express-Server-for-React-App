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
import TextFieldGroup from '../common/TextFieldGroup'
import ShowModalSingleAction from '../common/ShowModalSingleAction'

const Register = (props) => {

    // const [name, setName] = useState();
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    // const [password2, setPassword2] = useState();

    // const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const errors = useSelector((state) => state.error.value)

    const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated);

    // Prevent veto navigtion to either Login or Register page, if isAuthenticated
    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
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

        registerUser(newUser, dispatch, navigate)
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
                buttonText='Close'
            />
        )
    }

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form noValidate onSubmit={submitHandler}>

                            <TextFieldGroup
                                placeholder='Name'
                                type='text'
                                name='name'
                                refInput={nameInput}
                                error={errors.name}
                            />

                            <TextFieldGroup
                                placeholder='Email Address'
                                type='email'
                                name='email'
                                refInput={emailInput}
                                error={errors.email}
                                info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
                            />

                            <TextFieldGroup
                                placeholder='Password'
                                type='password'
                                name='password'
                                refInput={passwordInput}
                                error={errors.password}
                            />
                            
                            <TextFieldGroup
                                placeholder='Confirm Password'
                                type='password'
                                name='password2'
                                refInput={password2Input}
                                error={errors.password2}
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

// Register.propTypes = {
//     registeruser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//     auth: state.auth
// });

// export default connect(mapStateToProps, { registeruser })(Register)

export default Register;