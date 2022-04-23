import React from 'react'
import isEmpty from '../../validation/is-empty'

const ProfileAbout = ({ about }) => {

  // Get first name
  const firstName = about.user.name.trim().split(' ')[0]
  console.log(`First name ends with "s": ${firstName.split('').pop() === "s"}`)

  // Check if first name ends with 's'
  const firstNameEndsWithS = firstName.split('').slice(-1)[0] === "s"

  // Skill list
  const skills = about.skills.map((skill, index) => (
    <div key={index} className='p-3'>
      <i className="fa fa-check" /> {skill}
    </div>
  ))

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{firstNameEndsWithS ? `${firstName}' Bio` : `${firstName}'s Bio`}</h3>
          <p className="lead">{isEmpty(about.bio) ? <span>{firstName} did not include a bio!</span> : <span>{about.bio}</span>}</p>
          <hr />
          <h3 className="text-center text-info">Skills</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileAbout