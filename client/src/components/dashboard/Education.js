import React from 'react'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { deleteEducation } from '../../actions/profileActions'

const Education = ({ edu }) => {

    const dispatch = useDispatch()

    const education = edu.map(education => (
        <tr key={education._id}>
            <td>{education.school}</td>
            <td>{education.degree}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{education.from}</Moment> -
                {education.to === null ? ' Current' : <> <Moment format='DD/MM/YYYY'>{education.to}</Moment></>}
            </td>
            <td><button onClick={() => deleteEducation(education._id, dispatch)} className="btn btn-danger">Delete</button></td>
        </tr>
    ))

    return (
        <div>
            <h4 className='mb-4'>Education Credential</h4>
            <table className='table'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Duration</th>
                        <th />
                    </tr>
                    {education}
                </thead>
            </table>
        </div>
    )
}

export default Education