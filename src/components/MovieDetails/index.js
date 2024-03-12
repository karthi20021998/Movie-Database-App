import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import CastDetails from '../CastDetails'
import './index.css'

const MovieDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params

  const [apiResponse, setApiResponse] = useState({})
  const [apiCast, setApiCast] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getUpdatedData = responseData => ({
    title: responseData.title,
    posterPath: `https://image.tmdb.org/t/p/w500${responseData.poster_path}`,
    voteAverage: responseData.vote_average,
    runtime: responseData.runtime,
    releaseDate: responseData.release_date,
    overview: responseData.overview,
    genres: responseData.genres.map(eachGenre => ({
      genreId: eachGenre.id,
      genreName: eachGenre.name,
    })),
  })

  const getUpdatedCastData = data => ({
    cast: data.cast.map(eachCast => ({
      castId: eachCast.cast_id,
      profilePath: `https://image.tmdb.org/t/p/w500${eachCast.profile_path}`,
      originalName: eachCast.original_name,
      character: eachCast.character,
    })),
  })

  const fetchSingleMovieDetailsApi = async () => {
    const apiKey = '53036d07e341f86aa8a4a90d29175721'
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const newData = getUpdatedData(data)
      setApiResponse(newData)
      setIsLoading(false)
    }
  }

  const fetchSingleMovieCastApi = async () => {
    const apiKey = '53036d07e341f86aa8a4a90d29175721'
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    const response = await fetch(url)
    if (response.ok === true) {
      const castData = await response.json()
      const newCastData = getUpdatedCastData(castData)
      setApiCast(newCastData)
    }
  }

  useEffect(() => {
    fetchSingleMovieDetailsApi()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchSingleMovieCastApi()
    // eslint-disable-next-line
  }, [])

  const renderSingleMovieDetails = () => {
    const {posterPath, title, voteAverage, runtime, overview} = apiResponse
    const {genres, releaseDate} = apiResponse
    return (
      <div className="single-movie-container">
        <h1 className="movie-details-heading">Movie Details</h1>
        <img
          src={posterPath}
          alt="singlemovieimage"
          className="single-movie-image"
        />
        <div className="single-movie-sub-card">
          <h2>{title}</h2>
          <p>Storyline: {overview}</p>
          <p>Rating: {voteAverage}</p>
          <p>Runtime: {runtime} min</p>
          <p>ReleaseDate: {releaseDate}</p>
          <ul className="genre-card">
            {genres.map(eachGenre => (
              <li className="genre-name" key={eachGenre.genreId}>
                {eachGenre.genreName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  const renderSingleMovieCast = () => {
    const {cast} = apiCast
    return (
      <ul className="cast-container">
        {cast &&
          cast.map(eachMember => (
            <CastDetails key={eachMember.castId} cast={eachMember} />
          ))}
      </ul>
    )
  }

  const renderLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#15158f" height="50" width="50" />
    </div>
  )

  return (
    <>
      <NavBar />
      {isLoading && renderLoader()}
      {!isLoading && renderSingleMovieDetails()}
      {renderSingleMovieCast()}
    </>
  )
}

export default MovieDetails
