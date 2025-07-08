import React, { useState } from 'react';
import axios from 'axios';
import './SearchProjects.css';
import { Star, GitBranch, ExternalLink, Loader } from 'lucide-react';

const SearchProjects = () => {
  const [query, setQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setProjects([]);
    setSubmitted(true);

    try {
      const res = await axios.get(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`);
      setProjects(res.data.items);
    } catch (err) {
      console.error('Error fetching repositories:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="search-projects">
      <div className="container">
        <h2 className="section-title">Search Open Source Projects</h2>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="e.g. react, portfolio, dashboard..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            />
          <button type="submit" className="search-btn">Search</button>
        </form>

        {loading && (
          <div className="loading">
            <Loader className="spinner" size={24} />
            <span>Searching GitHub...</span>
          </div>
        )}

        {!loading && submitted && projects.length === 0 && (
          <p className="no-results">No projects found. Try a different keyword.</p>
        )}

        <div className="project-results">
          {projects.map((repo) => (
            <div className="project-card" key={repo.id}>
              <div className="project-header">
                <h3>{repo.full_name}</h3>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
                  <ExternalLink size={18} />
                </a>
              </div>
              {repo.description && <p className="project-description">{repo.description}</p>}
              <div className="project-meta">
                <span className="meta-item">
                  <Star size={16} /> {repo.stargazers_count}
                </span>
                <span className="meta-item">
                  <GitBranch size={16} /> {repo.forks_count}
                </span>
                {repo.language && (
                  <span className="meta-item language">{repo.language}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchProjects;
