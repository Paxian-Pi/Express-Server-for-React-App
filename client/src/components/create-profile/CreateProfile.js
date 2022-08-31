import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

const CreateProfile = () => {

    // const state = {
    //     displaySocialInputs: false,
    //     handle: '',
    //     company: '',
    //     website: '',
    //     location: '',
    //     status: '',
    //     skills: '',
    //     githubusername: '',
    //     bio: '',
    //     twitter: '',
    //     facebook: '',
    //     linkedin: '',
    //     youTube: '',
    //     instgram: '',
    //     errors: {}
    // }

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.auth.value);

    const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
    const [handle, setHandle] = useState('');
    const [company, setCompany] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [skills, setSkills] = useState('');
    const [githubusername, setGithubusername] = useState('');
    const [bio, setBio] = useState('');
    const [twitter, setTwitter] = useState('');
    const [facebook, setFacebook] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [youTube, setYouTube] = useState('');
    const [instagram, setInstgram] = useState('');
    // const [errors, setErrors] = useState({});

    const errors = useSelector((state) => state.error.value);

    const submitHandler = (e) => {
        e.preventDefault();

        const profileData = {
            handle,
            company,
            website,
            location,
            status,
            skills,
            githubusername,
            bio,
            twitter,
            facebook,
            linkedin,
            youTube,
            instagram
        }

        // console.log(profileData);

        createProfile(profileData, navigate, dispatch);
        }

        let socialInput;

        if (displaySocialInputs) {
            socialInput = (
                <div>
                    <InputGroup
                        placeholder='Twitter Profile URL'
                        name='twitter'
                        icon='fab fa-twitter'
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder='Facebook Page URL'
                        name='facebook'
                        icon='fab fa-facebook'
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder='Linkedin Profile URL'
                        name='linkedin'
                        icon='fab fa-linkedin'
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        error={errors.linkedin}
                    />
                    <InputGroup
                        placeholder='YouTube Channel URL'
                        name='youtube'
                        icon='fab fa-youtube'
                        value={youTube}
                        onChange={(e) => setYouTube(e.target.value)}
                        error={errors.youTube}
                    />
                    <InputGroup
                        placeholder='Instagram Page URL'
                        name='instagram'
                        icon='fab fa-instagram'
                        value={instagram}
                        onChange={(e) => setInstgram(e.target.value)}
                        error={errors.instgram}
                    />
                </div>
            )
        }

        //Select options for status
        const options = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' },
        ]
        
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">Let's get some information to make your profile stand out</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={submitHandler}>
                                
                                <TextFieldGroup
                                    placeholder='* Profile Handle'
                                    name='handle'
                                    value={handle}
                                    onChange={(e) => setHandle(e.target.value)}
                                    error={errors.handle}
                                    info='A unique handle for your profile URL. Your full name, company name'
                                />
                                
                                <SelectListGroup
                                    placeholder='Status'
                                    name='status'
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    options={options}
                                    error={errors.status}
                                    info='Give us an idea of where you are at in your career'
                                />

                                <TextFieldGroup
                                    placeholder='Company'
                                    name='company'
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    error={errors.company}
                                    info='Could be your own company or one you work for'
                                />

                                <TextFieldGroup
                                    placeholder='Website'
                                    name='website'
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    error={errors.website}
                                    info='Could be your own or a company website'
                                />

                                <TextFieldGroup
                                    placeholder='Location'
                                    name='location'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    error={errors.location}
                                    info='City and state suggested (eg. Lagos, LA)'
                                />

                                <TextFieldGroup
                                    placeholder='* Skills'
                                    name='skills'
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    error={errors.skills}
                                    info='Please use comma separated values (eg Java,Flutter,React,Nodejs)'
                                />

                                <TextFieldGroup
                                    placeholder='Github Username'
                                    name='githubusername'
                                    value={githubusername}
                                    onChange={(e) => setGithubusername(e.target.value)}
                                    error={errors.githubusername}
                                    info='If you want your latest repos and a Github link, include your username'
                                />

                                <TextAreaFieldGroup
                                    placeholder='Short Bio'
                                    name='bio'
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    error={errors.bio}
                                    info='Tell us a little about yourself'
                                />

                                <div className="mb-3">
                                    <button type="button" onClick={() => {
                                        if (!displaySocialInputs) setDisplaySocialInputs(true)
                                        else setDisplaySocialInputs(false)
                                    }} className="btn btn-light">
                                        Add Social Network Link
                                    </button>
                                    <span className="text-muted ml-2">Optional</span>
                                </div>
                                {socialInput}
                                <input type="submit" value="Submit" className='btn btn-info btn-block mt-4' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    export default CreateProfile