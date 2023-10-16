import React from 'react'
import User from '../User/User'

import './Table.css'

const Table = ({ handleSelect, dataInPage, columns }) => {
  const handleTopCheckBox = e => {
    if (e.target.checked) {
      dataInPage.map(x => !x.isChecked && handleSelect(x.id))
    } else {
      dataInPage.map(x => x.isChecked && handleSelect(x.id))
    }
  }

  return (
    <div
      style={{
        width: '100%',
        margin: 'auto',
        height: 'calc(100% - 80px)',
        overflow: 'auto',
        border: '1px solid #afafaf',
        'border-radius': '8px'
      }}
    >
      <table style={{ borderSpacing: '0', width: '100%' }}>
        <thead style={{ backgroundColor: '#f8f8f8', border: '1px solid #afafaf' }}>
          <tr>
            <th style={{ paddingLeft: '20px' }}>
              <input type="checkbox" onChange={handleTopCheckBox} />
            </th>
            {columns.map(column => (
              <th key={column.field}>
                <div className="data">{column.headerName}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataInPage.map(user => (
            <User columns={columns} key={user.id} row={user} handleSelect={handleSelect} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
