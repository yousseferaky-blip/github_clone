import { Code, Globe, Star, Users } from 'lucide-react';
import  './Stats.css'

const Stats = () => {
     const stats = [
    { icon: <Code size={32} />, number: '100M+', label: 'Repositories' },
    { icon: <Users size={32} />, number: '83M+', label: 'Developers' },
    { icon: <Globe size={32} />, number: '200+', label: 'Countries' },
    { icon: <Star size={32} />, number: '1B+', label: 'Stars Given' }
  ];
  return (
    <section className="stats-section">
        <div className="container">
          <h2 className="section-title">Trusted by millions of developers</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Stats