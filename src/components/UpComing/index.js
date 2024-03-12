import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import './index.css'

const UpComing = () => {
  const [apiResponse, setApiResponse] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      title: eachMovie.title,
      voteAverage: eachMovie.vote_average,
    })),
  })

  const fetchUpComingMoviesApi = async (page = 1) => {
    const apiKey = '53036d07e341f86aa8a4a90d29175721'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const newData = getUpdatedData(data)
      setApiResponse(newData)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUpComingMoviesApi()
    // eslint-disable-next-line
  }, [])

  const renderPopularMoviesList = () => {
    const {results} = apiResponse
    return (
      <ul className="movie-list-container">
        {results.map(eachMovie => (
          <MovieCard key={eachMovie.id} movies={eachMovie} />
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
      <div>{isLoading ? renderLoader() : renderPopularMoviesList()}</div>
      <Pagination
        totalPages={apiResponse.totalPages}
        apiCallBack={fetchUpComingMoviesApi}
      />
    </>
  )
}

export default UpComing
