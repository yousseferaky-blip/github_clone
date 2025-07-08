import { useEffect, useState } from 'react';
import  './Following.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { axiosConfig, GITHUB_API } from '../../Utils/constants';

const Following = () => {
    const {username} = useParams()
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getFollowing = async () =>{
            try{
                const res = await axios.get(`${GITHUB_API}/${username}/following`, axiosConfig);  
                setFollowing(res.data)
                console.log(following.data)
            }catch(err){
                console.log(err)
            }finally {
                setLoading(false);
            }
        }
        getFollowing()
    },[username])

    if(loading) return  <LoadingSpinner />

  return (
    <section className='following'>
        <div className='container'>
            <div className='following-header'>
                <h1> Following ({following.length}) </h1>
                <Link to={`/user/${username}`} className="back-link">
                    ← Back to Profile
                </Link>
            </div>
            <div className='following-grid'>
             {
                following.length === 0 ? (
                    <h1  style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60vh',
                        margin: 0,
                        textAlign: 'center',
                        color: '#888', 
                    }}>No Following Found</h1>
                ) : (
                    following.map((user, index) => (
                    <div className='following-card' key={index}>
                        <Link to={`/user/${user.login}`} className="user-link">
                        <img loading='lazy' src={user.avatar_url} alt={user.login} className="user-avatar" />
                        <div className="user-info">
                            <h3 className="user-name">{user.login}</h3>
                            <a
                            href={user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                            >
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

export default Following