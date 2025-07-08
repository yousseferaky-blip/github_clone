import  './Error404.css'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
      <div className="error-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Oops! Page not found</h2>
      <p className="error-description">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="error-link">
        Back to Home
      </Link>
    </div>
  )
}

export default Error