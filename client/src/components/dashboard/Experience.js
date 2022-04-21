import React from 'react'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { deleteExperience } from '../../actions/profileActions'

const Experience = ({ exp }) => {

    const dispatch = useDispatch()

    const experience = exp.map(experience => (
        <tr key={experience._id}>
            <td>{experience.company}</td>
            <td>{experience.title}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{experience.from}</Moment> -
                {experience.to === null ? ' Current' : <> <Moment format='DD/MM/YYYY'>{experience.to}</Moment></>}
            </td>
            <td><button onClick={() => deleteExperience(experience._id, dispatch)} className="btn btn-danger">Delete</button></td>
        </tr>
    ))

    return (
        <div>
            <h4 className='mb-4'>Experience Credential</h4>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th />
                    </tr>
                    {experience}
                </thead>
            </table>
        </div>
    )
}

export default Experience