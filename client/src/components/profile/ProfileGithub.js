import React, { useEffect, useState } from 'react'

const ProfileGithub = ({ username }) => {

  const [clientId, setClientId] = useState('32dc95476b4c415f9ed6')
  const [clientSecret, setSecret] = useState('2d5e3bfc19b05750de370e201592aece56a92c7f')
  const [count, setCount] = useState(5)
  const [sort, setSort] = useState('created: asc')
  const [repos, setRepos] = useState([])

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&client_id=${clientId}&client_secret=${clientSecret}`, {
      accept: 'application/vnd.github.v3+json'
    })
      .then(res => res.json())
      .then(data => {
        setRepos(data)
      })
      .catch(err => console.log(err))
  }, [])
  
  const repoError = repos.message

  const repoItems =
    repoError
      ? <div className='card card-body md-2'><h6 className='mb-6'>Wrong repo ID available</h6></div>
      : repos.map(repo => (
        <div key={repo.id} className='card card-body md-2'>
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a href={repo.html_url} className='text-info' target='_blank'>
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ))

  return (
    <div>
      <hr />
      <h3 className='mb-4'>Latest Github Repos</h3>
      {repoItems}
    </div>
  )
}

export default ProfileGithub