import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions'
import { clearProfile } from '../../actions/profileActions';
import { redirectToLoginOnTokenExpiration } from '../../app/methods';

function Navbar() {

    const [isLoggedout, setIsLoggedout] = useState(false);

    const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated);

    const user = useSelector((state) => state.auth.value.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();

        logoutUser(dispatch);

        clearProfile(dispatch);

        setIsLoggedout(true);
    }

    const onLinkClickHandler = () => {
        // Redirect to login, if token expires
        redirectToLoginOnTokenExpiration()
    }

    // Redirect to login page on logout
    useEffect(() => {
        if (isLoggedout) navigate('/login');
    }, [isLoggedout])
    
    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link onClick={onLinkClickHandler} className="nav-link" to={'/feed'}>Post Feed</Link>
            </li>
            <li className="nav-item">
                <Link onClick={onLinkClickHandler} className="nav-link" to={'/dashboard'}>Dashboard</Link>
            </li>
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
                <Link className="nav-link" to={'/login'}>Login</Link>
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