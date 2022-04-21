import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addEducation } from '../../actions/profileActions'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import TextFieldGroup from '../common/TextFieldGroup'

const AddEducation = () => {

    const [school, setSchool] = useState('')
    const [degree, setDegree] = useState('')
    const [fieldofstudy, setFieldofstudy] = useState('')
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

        const educationData = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        addEducation(educationData, navigate, dispatch)
    }

    return (
        <div className='add-education'>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to='/dashboard' className='btn btn-light'>
                            Go Back
                        </Link>
                        <h1 className="dispaly-4 text-center">Add Education</h1>
                        <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                        <small className="d-lock pb-3">* = required fields</small>
                        <form onSubmit={onSubmitHandler}>
                            <TextFieldGroup
                                placeholder='* School'
                                name='school'
                                value={school}
                                onChange={(e) => setSchool(e.target.value)}
                                error={errors.school}
                            />
                            <TextFieldGroup
                                placeholder='* Degree or Certification'
                                name='degree'
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                                error={errors.degree}
                            />
                            <TextFieldGroup
                                placeholder='* Fiels of Study'
                                name='fieldofstudy'
                                value={fieldofstudy}
                                onChange={(e) => setFieldofstudy(e.target.value)}
                                error={errors.fieldofstudy}
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
                                    Current School
                                </label>
                            </div>
                            <TextAreaFieldGroup
                                placeholder='Program Description'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                error={errors.description}
                                info='Tell us about the program that you were in'
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

export default AddEducation