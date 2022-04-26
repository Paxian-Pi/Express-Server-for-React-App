import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Landing = () => {

    const navigate = useNavigate();
    
    const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated);

    // Prevent veto navigtion to either Login or Register page, if isAuthenticated
    useEffect(() => {
        if(isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated]);

    return (
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">Developer Connector
                            </h1>
                            <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                            <hr />
                            <Link to={'/register'} className="btn btn-lg btn-info mr-2">Sign Up</Link>
                            <Link to={'/login'} className="btn btn-lg btn-light">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing