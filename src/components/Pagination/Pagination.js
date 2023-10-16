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
      <ul className="pagination">
        <a
          href="#"
          role="button"
          onClick={e => onChange(e, 1)}
          className={`${page === 1 ? ' disabled' : ''}`}
        >
          {'«'}
        </a>

        {pageNum.map((item, index) => (
          <a
            href="#"
            role="button"
            key={index}
            onClick={e => customPage(e, item)}
            className={`${page === item ? ' active' : ''}`}
          >
            {item}
          </a>
        ))}

        <a
          href="#"
          role="button"
          onClick={e => onChange(e, count)}
          className={`${page === count ? ' disabled' : ''}`}
        >
          {'»'}
        </a>
      </ul>
    </>
  )
}

export default Pagination
