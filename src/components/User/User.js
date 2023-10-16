import React from 'react'
import './User.css'

const User = ({ row, columns, handleSelect }) => {
  return (
    <>
      <tr className={row.isChecked ? 'checked' : ''}>
        <td style={{ paddingLeft: '20px' }}>
          <input
            type="checkbox"
            onChange={() => handleSelect(row.id)}
            checked={row.isChecked ? 'checked' : ''}
          />
        </td>

        {columns.map(col => (
          <td key={col.id}>
            <div className="employee-row">
              <>{col.renderCell && col.renderCell({ row })}</>
            </div>
          </td>
        ))}
      </tr>
    </>
  )
}
export default User
