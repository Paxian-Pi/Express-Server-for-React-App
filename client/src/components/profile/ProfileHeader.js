import React from 'react'
import isEmpty from '../../validation/is-empty'

const ProfileHeader = ({ header }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img className="rounded-circle" src={header.user.avatar} alt="" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{header.user.name}</h1>
            <p className="lead text-center">{header.status} {isEmpty(header.company) ? null : <span>at {header.company}</span>}</p>
            {isEmpty(header.location) ? null : <p>{header.location}</p>}

            <p>
              {isEmpty(header.website) ? null : (
                <a className="text-white p-2" href={header.website} target='_blank'>
                  <i className="fas fa-globe fa-2x"></i>
                </a>
              )}

              {isEmpty(header.social && header.social.twitter) ? null : (
                <a className="text-white p-2" href={header.social.twitter} target='_blank'>
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              )}

              {isEmpty(header.social && header.social.facebook) ? null : (
                <a className="text-white p-2" href={header.social.facebook} target='_blank'>
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
              )}

              {isEmpty(header.social && header.social.linkedin) ? null : (
                <a className="text-white p-2" href={header.social.linkedin} target='_blank'>
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              )}
              
              {isEmpty(header.social && header.social.youtube) ? null : (
                <a className="text-white p-2" href={header.social.youtube} target='_blank'>
                  <i className="fab fa-youtube fa-2x"></i>
                </a>
              )}

              {isEmpty(header.social && header.social.instagram) ? null : (
                <a className="text-white p-2" href={header.social.instagram} target='_blank'>
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader