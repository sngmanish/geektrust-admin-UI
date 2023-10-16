import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Table from '../components/Table/Table'

const dataInPage = [
  {
    id: '1',
    name: 'Aaron Miles',
    email: 'aaron@mailinator.com',
    role: 'member'
  },
  {
    id: '2',
    name: 'Aishwarya Naik',
    email: 'aishwarya@mailinator.com',
    role: 'member'
  },
  {
    id: '3',
    name: 'Arvind Kumar',
    email: 'arvind@mailinator.com',
    role: 'admin'
  },
  {
    id: '4',
    name: 'Caterina Binotto',
    email: 'caterina@mailinator.com',
    role: 'member'
  },
  {
    id: '5',
    name: 'Chetan Kumar',
    email: 'chetan@mailinator.com',
    role: 'member'
  }
]

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    renderCell: params => {
      return <div className="employee-row">{params.row.name}</div>
    }
  },
  {
    field: 'email',
    headerName: 'Email',
    renderCell: params => {
      return <div className="employee-row">{params.row.email}</div>
    }
  },
  {
    field: 'role',
    headerName: 'Role',
    renderCell: params => {
      return <div className="employee-row">{params.row.role}</div>
    }
  }
]

test('selects all rows when top checkbox is checked', () => {
  const handleSelect = jest.fn()
  render(<Table handleSelect={handleSelect} dataInPage={dataInPage} columns={columns} />)
  const topCheckbox = screen.getByRole('checkbox', { name: 'select all rows' })
  fireEvent.click(topCheckbox)
  expect(handleSelect).toHaveBeenCalledTimes(dataInPage.length)
  dataInPage.forEach(user => {
    expect(handleSelect).toHaveBeenCalledWith(user.id)
  })
})
