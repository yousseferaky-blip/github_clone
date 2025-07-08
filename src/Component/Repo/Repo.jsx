import axios from 'axios'
import  './Repo.css'
import { Eye, GitBranch, Search, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { axiosConfig, GITHUB_API } from '../../Utils/constants'

const Repo = () => {
    const {username} = useParams()
    const [repos, setRepos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const getRepos = async () =>{

            try{
                const res = await axios.get(`${GITHUB_API}/${username}/repos`,axiosConfig);
                setRepos(res.data)
            } catch (error) {
                console.log(error)
            }  finally {
                setLoading(false);
            } 
        }
        getRepos()
      }, [username])

      if(loading) return  <LoadingSpinner  />
      if (repos.length === 0) return <p style={{ marginTop: "160px" ,padding: '2rem' }}>No repositories found.</p>;
  return (
    <section className='repositories'>
        <div className='container'>
            <div className="page-header">
                <h1>Repositories</h1>
                <Link to={`/user/${username}`} className="back-link">
                    ← Back to Profile
                </Link>
            </div>

            <div className="filters">
                <div className="search-container">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search repositories..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e)=> setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className='repos-grid'>
                {
                    repos.filter(repo => repo.name.toLowerCase().includes(searchTerm.toLowerCase()) || (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())))
                    .map((repo,index)=>(
                        <div key={index} className="repo-card">
                             <div className="repo-header">
                                <Link to={`/user/${username}/${repo.name}`} className="repo-name">
                                {repo.name}
                                </Link>
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="external-link">
                                View on GitHub
                                </a>
                            </div>

                            {repo.description && (
                                <p className="repo-description">{repo.description}</p>
                             )}

                                <div className="repo-stats">
                                    {repo.language && (
                                    <span className="language" >
                                        {repo.language}
                                    </span>
                                    )}
                                    <div className="stat">
                                    <Star size={16} />
                                    <span>{repo.stargazers_count}</span>
                                    </div>
                                    <div className="stat">
                                    <GitBranch size={16} />
                                    <span>{repo.forks_count}</span>
                                    </div>
                                    <div className="stat">
                                    <Eye size={16} />
                                    <span>{repo.watchers_count}</span>
                                    </div>
                                </div>
                                <div className="repo-updated">
                                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                                </div>
                        </div>
                    ))
                }
            </div>

        </div>
        
    </section>
  )
}

export default Repo