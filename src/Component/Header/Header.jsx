import  './Header.css'
import { Github, Moon, Search, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const [darkMode , setDarkMode] = useState(false)
    const [search , setSearch] = useState("")
    const navigate = useNavigate()
    
    useEffect(() => {
        const storedMode = localStorage.getItem("darkMode")
        if(storedMode === "true"){
            setDarkMode(true)
            document.body.classList.add("dark")
        }
     }, []);

    useEffect(() => {
        localStorage.setItem("darkMode",darkMode)
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);


  const handleSearch = async (e) => {
    e.preventDefault();
    if(search.trim() === "") return
    navigate(`/user/${search}`)
    setSearch("")
    }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <Github size={32} />
          <span>GitExplorer</span>
        </Link>
        
        <form onSubmit={handleSearch}  className="search-form">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search GitHub users..."
              className="search-input"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div>
        </form>

        <button 
        onClick={()=>setDarkMode(!darkMode)}
          className="theme-toggle"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  )
}

export default Header