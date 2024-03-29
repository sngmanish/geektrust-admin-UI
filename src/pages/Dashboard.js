import React from 'react'
import Table from '../components/Table/Table'
import SearchBox from '../components/SearchBox/SearchBox'
import useDashboard from './hooks/useDashboard'
import Pagination from '../components/Pagination/Pagination'
import DeleteButton from '../components/DeleteButton/DeleteButton'

const Dashboard = () => {
  const { totalNumberOfPages, searchBoxProps, tableProps, paginationProps, deleteButtonProps } =
    useDashboard()

  return (
    <div
      style={{
        'box-sizing': 'border-box',
        display: 'flex',
        gap: '1rem',
        'flex-direction': 'column',
        padding: '10px 20px',
        width: 'calc(100%)',
        height: 'calc(100%)'
      }}
    >
      {/* SearchBox */}
      <SearchBox {...searchBoxProps} />

      {/* Table */}
      {<Table {...tableProps} />}

      {/* Pagination and Delete Button  */}
      {totalNumberOfPages > 1 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            gap: '10px',
            flexWrap: 'wrap',
            width: '100%',
            margin: 'auto',
            height: '45px'
          }}
        >
          <DeleteButton {...deleteButtonProps} />
          <Pagination {...paginationProps} />
        </div>
      ) : null}
    </div>
  )
}
export default Dashboard
