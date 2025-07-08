import axios from 'axios'
import   './Profile.css'
import { Building, ExternalLink, GitBranch, LinkIcon, MapPin, Star, Twitter, Users } from 'lucide-react';
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../Component/LoadingSpinner/LoadingSpinner';
import { axiosConfig, GITHUB_API } from '../../Utils/constants';

const Profile = () => {
    const {username} = useParams()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
      useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${GITHUB_API}/${username}`, axiosConfig);
        setUser(res.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setUser(null);
          navigate("/404")
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

   if (loading) return <LoadingSpinner />

  return (
     <div className="profile">
      <div className="container">
        <div className="profile-header">
          <div className="profile-info">
            <img src={user.avatar_url} alt={user.name} className="profile-avatar" />
            <div className="profile-details">
              <h1 className="profile-name">{user.name || user.login}</h1>
              <p className="profile-username">@{user.login}</p>
              {user.bio && <p className="profile-bio">{user.bio}</p>}
              
              <div className="profile-meta">
                {user.location && (
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.company && (
                  <div className="meta-item">
                    <Building size={16} />
                    <span>{user.company}</span>
                  </div>
                )}
                {user.blog && (
                  <div className="meta-item">
                    <LinkIcon size={16} />
                    <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                       target="_blank" rel="noopener noreferrer">
                      {user.blog}
                    </a>
                  </div>
                )}
                {user.twitter_username && (
                  <div className="meta-item">
                    <Twitter size={16} />
                    <a href={`https://twitter.com/${user.twitter_username}`} 
                       target="_blank" rel="noopener noreferrer">
                      @{user.twitter_username}
                    </a>
                  </div>
                )}
              </div>
              
              <p className="join-date">Joined {user.created_at.split('T')[0]}</p>
            </div>
          </div>
          
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
            <ExternalLink size={16} />
            View on GitHub
          </a>
        </div>

        <div className="profile-stats">
          <Link to={`/user/${username}/repos`} className="stat-card">
            <GitBranch size={24} />
            <div>
              <span className="stat-number">{user.public_repos}</span>
              <span className="stat-label">Repositories</span>
            </div>
          </Link>
          
          <Link to={`/user/${username}/followers`} className="stat-card">
            <Users size={24} />
            <div>
              <span className="stat-number">{user.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
          </Link>
          
          <Link to={`/user/${username}/following`} className="stat-card">
            <Users size={24} />
            <div>
              <span className="stat-number">{user.following}</span>
              <span className="stat-label">Following</span>
            </div>
          </Link>
          
          <div className="stat-card">
            <Star size={24} />
            <div>
              <span className="stat-number">{user.public_gists}</span>
              <span className="stat-label">Gists</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile