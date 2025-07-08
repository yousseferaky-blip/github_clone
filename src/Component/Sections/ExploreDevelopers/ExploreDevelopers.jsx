import { useEffect, useState } from 'react';
import axios from 'axios';
import './ExploreDevelopers.css';
import { ExternalLink, Loader, MapPin, Users } from 'lucide-react';
import { GITHUB_API } from '../../../Utils/constants';

const usernames = ['torvalds', 'gaearon', 'sindresorhus', 'yyx990803', 'tj', 'getify'];

const ExploreDevelopers = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const responses = await Promise.all(
          usernames.map(username =>
            axios.get(`${GITHUB_API}/${username}`)
          )
        );
        const data = responses.map(res => res.data);
        setDevelopers(data);
      } catch (error) {
        console.error('Error fetching developers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  return (
    <section className="explore-developers">
      <div className="container">
        <h2 className="section-title">🌟 Explore Amazing Developers</h2>

        {loading ? (
          <p className="loading"><Loader /></p>
        ) : (
          <div className="developer-grid">
            {developers.map(dev => (
              <div key={dev.id} className="developer-card">
                <img src={dev.avatar_url} alt={dev.login} className="avatar" />
                <h3>{dev.name || dev.login}</h3>
                <p className="username">@{dev.login}</p>
                {dev.location && (
                  <p className="meta"><MapPin size={14} /> {dev.location}</p>
                )}
                <p className="meta"><Users size={14} /> {dev.followers} followers</p>
                <a
                  href={dev.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  <ExternalLink size={16} /> GitHub Profile
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreDevelopers;
