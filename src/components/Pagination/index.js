import './index.css'
import {useState, useEffect} from 'react'

const Pagination = props => {
  const {totalPages, apiCallBack} = props
  const [pageNo, setPageNo] = useState(1)

  const onNextPage = () => {
    setPageNo(prevState => {
      if (prevState < totalPages) {
        return prevState + 1
      }
      return prevState
    })
  }

  const onPrevPage = () => {
    setPageNo(prevState => {
      if (prevState > 1) {
        return prevState - 1
      }
      return prevState
    })
  }

  useEffect(() => {
    apiCallBack(pageNo)
    // eslint-disable-next-line
  }, [pageNo])

  return (
    <nav className="page-card">
      <button type="button" onClick={onPrevPage} className="control-btn">
        Prev
      </button>
      <p className="page-no">{pageNo}</p>
      <button type="button" onClick={onNextPage} className="control-btn">
        Next
      </button>
    </nav>
  )
}

export default Pagination
