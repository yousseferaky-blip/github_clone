import { Github } from 'lucide-react'
import  './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Explore the World of
              <br />
              <span className="gradient-text">Open Source</span>
            </h1>
            <p className="hero-description">
              Discover amazing developers, explore their repositories, and get inspired by 
              the incredible open source community on GitHub.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <Github size={24} />
                <span>Powered by GitHub API</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card">
              <Github size={64} className="github-icon" />
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero