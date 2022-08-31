import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addExperience } from '../../actions/profileActions'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import TextFieldGroup from '../common/TextFieldGroup'

const AddExperience = () => {

    const [company, setCompany] = useState('')
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [current, setCurrent] = useState(false)
    const [description, setDescription] = useState('')
    const [disabled, setDisabled] = useState(false)

    const errors = useSelector((state) => state.error.value)
    const profile = useSelector((state) => state.profile.value.profile)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onCheckedHandler = () => {
        setCurrent(!current)
        setDisabled(!disabled)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        
        const experienceData = {
            company,
            title,
            location,
            from,
            to,
            current,
            description
        }

        addExperience(experienceData, navigate, dispatch)
    }
    
    return (
        <div className='add-experience'>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to='/dashboard' className='btn btn-light'>
                            Go Back
                        </Link>
                        <h1 className="dispaly-4 text-center">Add Experience</h1>
                        <p className="lead text-center">Add your current or past job or position</p>
                        <small className="d-lock pb-3">* = required fields</small>
                        <form onSubmit={onSubmitHandler}>
                            <TextFieldGroup
                                placeholder='* Company'
                                name='company'
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                error={errors.company}
                            />
                            <TextFieldGroup
                                placeholder='* Job Title'
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                error={errors.title}
                            />
                            <TextFieldGroup
                                placeholder='Location'
                                name='location'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                error={errors.location}
                            />
                            <h6>From Date</h6>
                            <TextFieldGroup
                                name='from'
                                type='date'
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                error={errors.from}
                            />
                            <h6>To Date</h6>
                            <TextFieldGroup
                                name='to'
                                type='date'
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                error={errors.to}
                                disabled={disabled ? 'disabled' : ''}
                            />
                            <div className="form-check mb-4">
                                <input
                                    type="checkbox"
                                    className='form-check-input'
                                    name='current'
                                    value={current}
                                    checked={current}
                                    onChange={onCheckedHandler}
                                    id='current'
                                />
                                <label htmlFor="current" className="form-check-label">
                                    Current Job
                                </label>
                            </div>
                            <TextAreaFieldGroup
                                placeholder='Job Description'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                error={errors.description}
                                info='Tell us about the position'
                            />
                            <input
                                type="submit"
                                value='Submit'
                                className='btn btn-info btn-block mt-4'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddExperience