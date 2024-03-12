import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movies} = props
  const {id, title, posterPath, voteAverage} = movies
  return (
    <li className="movie-items-list-container">
      <div className="movie-items-card">
        <img src={posterPath} alt="movieimage" className="movie-image" />
        <div>
          <h1 className="movie-title">{title}</h1>
          <p className="movie-vote-avg">Rating: {voteAverage}</p>
        </div>
        <Link to={`/movie/${id}`}>
          <button type="button" className="view-details-btn">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MovieCard
