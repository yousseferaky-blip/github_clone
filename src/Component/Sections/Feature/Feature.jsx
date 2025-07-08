import { GitBranch, Star, Users } from 'lucide-react';
import  './Feature.css'

const Feature = () => {
    const features = [
    {
      icon: <Users size={48} />,
      title: 'Explore Developers',
      description: 'Discover amazing developers and their contributions to open source'
    },
    {
      icon: <Star size={48} />,
      title: 'Browse Repositories',
      description: 'Explore public repositories with detailed information and statistics'
    },
    {
      icon: <GitBranch size={48} />,
      title: 'Track Activity',
      description: 'Follow developer activity and stay updated with their latest work'
    }
  ];
  return (
     <section className="features">
        <div className="container">
          <h2 className="section-title">What You Can Do</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Feature