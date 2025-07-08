import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Header from './Component/Header/Header'
import Hero from './Component/Sections/Hero/Hero'
import Profile from './Pages/Profile/Profile'
import Error from './Component/Error/Error'
import Repo from './Component/Repo/Repo'
import Following from './Component/Following/Following'
import Followers from './Component/Followers/Followers'
import RepoDetails from './Component/RepoDetails/RepoDetails'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/user/:username' element={<Profile />}/>
        <Route path='/user/:username/repos' element={<Repo />}/>
        <Route path='/user/:username/following' element={<Following />}/>
        <Route path='/user/:username/followers' element={<Followers />}/>
        <Route path='/user/:username/:repoName' element={<RepoDetails />}/>
        <Route path='*' element={<Error />}/>
      </Routes>
    </>
  )
}

export default App
