import {Link, withRouter} from 'react-router-dom'
import SearchMoviesContext from '../../context/SearchMoviesContext'
import './index.css'

const NavBar = props => {
  const {history} = props

  return (
    <SearchMoviesContext.Consumer>
      {value => {
        const {searchInput, onChangeSearchInput} = value
        const {onTriggerSearchingQuery} = value

        const onChangeHandler = event => {
          onChangeSearchInput(event.target.value)
        }

        const onClickHandler = () => {
          onTriggerSearchingQuery()
          history.push('/search')
        }

        return (
          <nav className="main-container">
            <div className="nav-container">
              <Link to="/" className="nav-link">
                <div>
                  <h1 className="logo-name">movieDB</h1>
                </div>
              </Link>
              <ul className="nav-items-list">
                <Link to="/" className="nav-link">
                  <li className="nav-item">Popular</li>
                </Link>
                <Link to="/top-rated" className="nav-link">
                  <li className="nav-item">Top Rated</li>
                </Link>
                <Link to="/upcoming" className="nav-link">
                  <li className="nav-item">Upcoming</li>
                </Link>
              </ul>
            </div>
            <div className="search-container">
              <input
                type="search"
                placeholder="search"
                value={searchInput}
                className="search-input"
                onChange={onChangeHandler}
              />
              <button
                type="button"
                className="search-btn"
                onClick={onClickHandler}
              >
                Search
              </button>
            </div>
          </nav>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
}

export default withRouter(NavBar)
