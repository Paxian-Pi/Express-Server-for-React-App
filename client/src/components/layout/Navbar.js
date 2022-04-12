import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions'

function Navbar() {

    const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated);
    const user = useSelector((state) => state.auth.value.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();

        logoutUser(dispatch);

        // Redirect to login page on logout
        window.location.href = '/login';
    }

    // Redirect to login page on logout: this method has poor UX side effect
    // useEffect(() => {
    //     if(!isAuthenticated) navigate('/login');
    // }, [!isAuthenticated]);

    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a href="#" onClick={handleLogout} className="nav-link" >
                    <img
                        className='rounded-circle'
                        src={user.avatar}
                        alt={user.name}
                        style={{ width: '25px', marginRight: '5px' }}
                        title='A Gravatar connected to your email will display an image!'
                    />
                    Logout
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to={'/register'}>Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={'login'}>Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>DevConnector</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={'/profiles'}>
                                Developers
                            </Link>
                        </li>
                    </ul>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </div>
        </nav>
    )
}

export default Navbar