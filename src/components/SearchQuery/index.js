import './index.css'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import Pagination from '../Pagination'
import MovieCard from '../MovieCard'

import SearchMoviesContext from '../../context/SearchMoviesContext'

const SearchQuery = () => {
  const renderEmptyView = () => (
    <div className="empty-container">
      <img
        src="https://res.cloudinary.com/dghnaymwn/image/upload/v1709725205/karthi/9318694_yyqzyt.jpg"
        alt="noresultimage"
        className="no-results-image"
      />
      <p>No Results</p>
    </div>
  )

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#15158f" height={50} width={50} />
    </div>
  )

  const renderMoviesList = searchResponse => {
    const {results} = searchResponse
    if (!results.length) {
      return renderEmptyView()
    }
    return (
      <ul className="movie-list-container">
        {results.map(eachMovie => (
          <MovieCard key={eachMovie.id} movies={eachMovie} />
        ))}
      </ul>
    )
  }

  const renderSearchResultsView = value => {
    const {apiStatus, searchResponse} = value
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMoviesList(searchResponse)
      default:
        return renderEmptyView()
    }
  }

  return (
    <SearchMoviesContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchingQuery} = value
        return (
          <>
            <NavBar />
            {renderSearchResultsView(value)}
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallBack={onTriggerSearchingQuery}
            />
          </>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
}

export default SearchQuery
