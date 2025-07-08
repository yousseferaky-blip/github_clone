import axios from 'axios'
import './RepoDetails.css'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { AlertCircle, ExternalLink, Eye, GitBranch, Star } from 'lucide-react'
import { marked } from 'marked'
import { axiosConfig } from '../../Utils/constants'

const RepoDetails = () => {
    const {username} = useParams()
    const {repoName} = useParams()
    const [repo, setRepo] = useState([]);
    const [readme, setReadme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
       const getRepo = async () => {
          try {
            const { data } = await axios.get(
              `https://api.github.com/repos/${username}/${repoName}`,
              axiosConfig
            );
            setRepo(data);

            try {
              const readmeRes = await axios.get(
                `https://api.github.com/repos/${username}/${repoName}/readme`,
                {
                  ...axiosConfig,
                  headers: {
                    ...axiosConfig.headers,
                    Accept: 'application/vnd.github.VERSION.raw',
                  },
                }
              );
              setReadme(marked(readmeRes.data));
            } catch (err) {
              if (err.response?.status === 404) {
                setReadme(null);
                if (import.meta.env.DEV) console.warn("README not found.");
              } else {
                console.error("Error loading README", err);
              }
            }
          } catch (err) {
            console.error("Error loading repo", err);
          } finally {
            setLoading(false);
          }
        };
        getRepo()
    },[username,repoName])
    if(loading) return  <LoadingSpinner />
    
  return (
    <section className="repo-details">
      <div className="container">

        <div className="page-header">
          <Link to={`/user/${username}/repos`} className="back-link">
            ← Back to Repositories
          </Link>
        </div>

        <div className="repo-header">
          <div className="repo-title">
            <h1>{repo.name}</h1>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="external-link">
              <ExternalLink size={20} />
              View on GitHub
            </a>
          </div>
          
          {repo.description && (
            <p className="repo-description">{repo.description}</p>
          )}

          {repo.topics && repo.topics.length > 0 && (
            <div className="repo-topics">
              {repo.topics.map(topic => (
                <span key={topic} className="topic">{topic}</span>
              ))}
            </div>
          )}
        </div>

        <div className="repo-stats-detailed">
          <div className="stat-card">
            <Star size={24} />
            <div>
              <span className="stat-number">{repo.stargazers_count}</span>
              <span className="stat-label">Stars</span>
            </div>
          </div>
          
          <div className="stat-card">
            <GitBranch size={24} />
            <div>
              <span className="stat-number">{repo.forks_count}</span>
              <span className="stat-label">Forks</span>
            </div>
          </div>
          
          <div className="stat-card">
            <Eye size={24} />
            <div>
              <span className="stat-number">{repo.watchers_count}</span>
              <span className="stat-label">Watchers</span>
            </div>
          </div>
          
          <div className="stat-card">
            <AlertCircle size={24} />
            <div>
              <span className="stat-number">{repo.open_issues_count}</span>
              <span className="stat-label">Issues</span>
            </div>
          </div>
        </div>

        <div className="repo-info">
          <div className="info-grid">
            {repo.language && (
              <div className="info-item">
                <strong>Language:</strong>
                <span className="language-tag">{repo.language}</span>
              </div>
            )}
            <div className="info-item">
              <strong>Default Branch:</strong>
              <span>{repo.default_branch}</span>
            </div>
            <div className="info-item">
              <strong>Created:</strong>
              <span>{new Date(repo.created_at).toLocaleDateString()}</span>
            </div>
            <div className="info-item">
              <strong>Last Updated:</strong>
              <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {readme ? (
        <div className="readme-section">
          <h2>README</h2>
          <div className="readme-content" dangerouslySetInnerHTML={{ __html: readme }} />
        </div>
      ) : (
        <div className="readme-section">
          <h2>README</h2>
          <p style={{ color: 'gray' }}>No README found for this repository.</p>
        
        </div>)}

      </div>
    </section>
  )
}

export default RepoDetails