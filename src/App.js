import {Switch, Route, Redirect} from 'react-router-dom'
import {useState} from 'react'

import Popular from './components/Popular'
import TopRated from './components/TopRated'
import UpComing from './components/UpComing'
import MovieDetails from './components/MovieDetails'
import SearchQuery from './components/SearchQuery'
import NotFound from './components/NotFound'

import SearchMoviesContext from './context/SearchMoviesContext'

import './App.css'

const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = value => {
    setSearchInput(value)
  }

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const onTriggerSearchingQuery = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiKey = '53036d07e341f86aa8a4a90d29175721'
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    const newData = getUpdatedData(data)
    setSearchResponse(newData)
    setApiStatus('SUCCESS')
  }

  return (
    <SearchMoviesContext.Provider
      value={{
        searchInput,
        onChangeSearchInput,
        onTriggerSearchingQuery,
        searchResponse,
        apiStatus,
      }}
    >
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={UpComing} />
        <Route exact path="/not-found" component={NotFound} />
        <Route exact path="/movie/:id" component={MovieDetails} />
        <Route exact path="/search" component={SearchQuery} />
        <Redirect to="/not-found" />
      </Switch>
    </SearchMoviesContext.Provider>
  )
}

export default App
