import React, { useMemo } from 'react'
import './Pagination.css'
import config from '../../config/index'

// page onchange, count

const Pagination = ({ page, onChange, count }) => {
  const pageLimit = config.MAX_PAGE

  const pageNum = useMemo(
    () => Array.from({ length: Math.min(pageLimit, count) }, (_, i) => 1 + i * 1),
    [count, page]
  )

  const customPage = (e, page) => {
    const pageNumber = Math.max(1, page)
    onChange(e, Math.min(pageNumber, count))
  }

  return (
    <>
      <ul className="pagination" >
        <a href="#" onClick={e => onChange(e, 1)}>
          &laquo;
        </a>

        {pageNum.map((item, index) => (
          <a
            href="#"
            key={index}
            onClick={e => customPage(e, item)}
            className={`${page === item ? ' active' : ''}`}
          >
            {item}
          </a>
        ))}

        <a href="#" onClick={e => onChange(e, count)}>
          &raquo;
        </a>
      </ul>
    </>
  )
}

export default Pagination
