import './index.css'

const CastDetails = props => {
  const {cast} = props
  const {profilePath, originalName, character} = cast
  return (
    <li className="cast-items-container">
      <img src={profilePath} alt="cast" className="cast-image" />
      <p className="cast-name">{originalName}</p>
      <p className="cast-character">Character: {character}</p>
    </li>
  )
}

export default CastDetails
