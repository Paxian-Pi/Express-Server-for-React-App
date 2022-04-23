import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getProfileByHandle } from '../../actions/profileActions'
import ProfileHeader from '../profile/ProfileHeader'
import ProfileAbout from '../profile/ProfileAbout'
import ProfileCreds from '../profile/ProfileCreds'
import ProfileGithub from '../profile/ProfileGithub'
import Spinner from '../common/Spinner'

const Profile = () => {
    const { profile, loading } = useSelector((state) => state.profile.value)

    const location = useLocation()
    const { handle } = location.state

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (handle) {
            getProfileByHandle(handle, dispatch)
        }
    }, [])

    let profileContent;

    if (profile === null || loading) profileContent = <Spinner />
    else {
        profileContent = (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to='/profiles' className='btn btn-light mb-3 float-left'>
                            Back To Profiles
                        </Link>
                    </div>
                    <div className="col-md-6"></div>
                </div>
                <ProfileHeader header={profile} />
                <ProfileAbout about={profile} />
                <ProfileCreds
                    experience={profile.experience}
                    education={profile.education}
                />
                {profile.githubusername ? <ProfileGithub username={profile.githubusername} /> : null}
            </div>
        )
    }

    return (
        <div className='profile'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {profileContent}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile