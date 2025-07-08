import { Link, useParams } from 'react-router-dom'
import  './Followers.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { axiosConfig, GITHUB_API } from '../../Utils/constants';

const Followers = () => {
    const {username} = useParams()
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const getFollowers= async () =>{
            try{
                const res = await axios.get(`${GITHUB_API}/${username}/followers`, axiosConfig);  
                setFollowers(res.data)
            }catch(err){
                console.log(err)
            } finally {
                setLoading(false);
            }
        }
        getFollowers()
    },[username])

    if(loading) return  <LoadingSpinner />

  return (
    <section className='followers'>
         <div className='container'>
            <div className='following-header'>
                <h1> Following ({followers.length}) </h1>
                <Link to={`/user/${username}`} className="back-link">
                    ← Back to Profile
                </Link>
            </div>
            <div className='following-grid'>
                {
                    followers.length === 0 ? (
                        <h1  style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60vh',
                        margin: 0,
                        textAlign: 'center',
                        color: '#888', 
                    }}>No Followers Found</h1>
                    ) :
                    (
                    followers.map((follower,index)=>(
                        <div className='following-card' key={index}>
                            <Link to={`/user/${follower.login}`} className="user-link">
                                <img loading='lazy' src={follower.avatar_url} alt={follower.login} className="user-avatar" />
                                <div className="user-info">
                                <h3 className="user-name">{follower.login}</h3>
                                <a href={follower.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
                                    View on GitHub
                                </a>
                                </div>
                            </Link>
                        </div>
                    ))
                    )
                }
            </div>
        </div>
    </section>
  )
}

export default Followers