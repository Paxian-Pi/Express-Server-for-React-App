import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

const Dashboard = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { profile, loading } = useSelector((state) => state.profile.value);

    const { user, isAuthenticated } = useSelector((state) => state.auth.value);

    let dashboardContent;

    // Redirect to login, if not authenticated - (Protected route)
    // useEffect(() => {
    //     if(!isAuthenticated) navigate('/login');
    // }, [!isAuthenticated]);


    // Load current user profile
    useEffect(() => {
        getCurrentProfile(dispatch);
    }, []);

    if (profile === null || loading) dashboardContent = <Spinner />
    else {
        // Check if logged in user has profile data
        if (Object.keys(profile).length > 0) {
            dashboardContent = <h4>TODO: Dispaly profile</h4>
        }
        else {
            // User is logged in but has no profile
            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcome {user.name}</p>
                    <p>You have not yet setup a profile, please  add some info!</p>
                    <Link to='/create-profile' className='btn btn-lg btn-info'>Create Profile</Link>
                </div>
            );
        }
    }

    return (
        <div className="dashboard">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4">Dashboard</h1>
                        {dashboardContent}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard