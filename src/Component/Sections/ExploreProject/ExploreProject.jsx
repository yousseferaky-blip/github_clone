import axios from 'axios';
import   './ExploreProject.css';
import { ExternalLink, GitBranch, Loader, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const ExploreProject = () => {
     const [projects, setProjects] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
    const fetchPopularProjects = async () => {
      try {
        const res = await axios.get(
          'https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=6'
        );
        setProjects(res.data.items);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProjects();
  }, []);


  return (
      <section className="explore-projects">
      <div className="container">
        <h2 className="section-title">🌟 Explore Popular GitHub Projects</h2>

        {loading ? (
          <p className="loading"><Loader /></p>
        ) : (
          <div className="project-grid">
            {projects.map((repo) => (
              <div className="project-card" key={repo.id}>
                <div className="project-header">
                  <h3>{repo.name}</h3>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} />
                  </a>
                </div>
                <p className="project-description">
                  {repo.description?.slice(0, 100)}...
                </p>
                <div className="project-meta">
                  <span><Star size={16} /> {repo.stargazers_count}</span>
                  <span><GitBranch size={16} /> {repo.forks_count}</span>
                  <span className="language">{repo.language}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ExploreProject