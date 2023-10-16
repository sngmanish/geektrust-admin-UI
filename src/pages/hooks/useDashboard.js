import { useEffect, useMemo, useState } from 'react'
import { getAdminUIData } from '../../services/adminData'
import config from '../../config'
import usePagination from '../../components/Pagination/usePagination'
import { Icon } from '@iconify/react'

const useDashboard = () => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')

  const { page, pageSize, handlePageChange } = usePagination({
    initialPage: 1,
    initialPageSize: config.MAX_ROW
  })

  //   Fetch data
  useEffect(() => {
    getAdminUIData()
      .then(res => {
        setData(
          res.map(row => ({
            ...row,
            isChecked: false
          }))
        )
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  //   Search data
  const filteredData = useMemo(() => {
    if (searchText.length > 0) {
      return (
        data.filter(user => {
          if (
            user.name.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase()) ||
            user.role.toLowerCase().includes(searchText.toLowerCase())
          )
            return user
        }) ?? []
      )
    } else {
      return data
    }
  }, [searchText, data])

  const handleDeleteClick = id => {
    let allUser = [...data]
    allUser = allUser.filter(user => user.id !== id)
    setData(allUser)
  }

  const handleBatchDelete = () => {
    let allUser = [...data]
    allUser = allUser.filter(user => !user.isChecked)
    setData(allUser)
  }

  const handleSelect = id => {
    let allUser = [...data]
    allUser.forEach(user => {
      if (user.id === id) {
        user.isChecked = !user.isChecked
      }
    })
    setData(allUser)
  }

  const handleEdit = row => {
    let allUser = [...data]
    allUser = allUser.map(user => {
      if (user.id === row.id) {
        return Object.assign(user, row)
      }
      return user
    })
    setData(allUser)
  }

  const dataInPage = useMemo(() => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return filteredData.slice(start, end)
  }, [filteredData, page, pageSize])

  const totalNumberOfPages = useMemo(
    () => Math.ceil(filteredData.length / pageSize),
    [filteredData]
  )

  const anyBoxChecked = useMemo(() => {
    return filteredData.reduce((i, member) => i || member.isChecked, false)
  }, [filteredData])

  const [selectedRowId, setSelectedRowId] = useState(null)

  const onEditClick = id => setSelectedRowId(id)

  const [editMode, setEditMode] = useState(false)

  // contains the row which is selected for edit
  const rowData = useMemo(
    () => (filteredData ?? []).find(x => selectedRowId === x.id),
    [filteredData, selectedRowId]
  )
  const [newValues, setNewValues] = useState(rowData ?? [])

  useEffect(() => {
    setNewValues(rowData ?? [])
  }, [rowData])

  const handleUserEdit = e => {
    if (editMode) {
      const name = e.target.name
      const value = e.target.value
      setNewValues({ ...newValues, [name]: value })
    }
  }
  const handleSave = () => {
    handleEdit(newValues)
    setEditMode(false)
    onEditClick(null)
  }
  const handleCancel = () => {
    setNewValues(filteredData.find(x => selectedRowId === x.id))
    setEditMode(false)
    onEditClick(null)
  }
  useEffect(() => {
    selectedRowId === rowData?.id ? setEditMode(true) : setEditMode(false)
  }, [selectedRowId, rowData?.id])

  const columns = useMemo(() => {
    return [
      {
        field: 'name',
        headerName: 'Name',
        renderCell: params => {
          return (
            <div className="employee-row">
              {selectedRowId === params.row.id ? (
                <input
                  className={`data${params.row.isChecked ? ' checked' : ''}${
                    selectedRowId === params.row.id ? ' editable' : ' normal'
                  }`}
                  name="name"
                  value={newValues.name}
                  onChange={handleUserEdit}
                />
              ) : (
                <div className="data">{params.row.name}</div>
              )}
            </div>
          )
        }
      },
      {
        field: 'email',
        headerName: 'Email',
        renderCell: params => {
          return (
            <div className="employee-row">
              {selectedRowId === params.row.id ? (
                <input
                  className={`data${params.row.isChecked ? ' checked' : ''}${
                    selectedRowId === params.row.id ? ' editable' : ' normal'
                  }`}
                  name="email"
                  value={newValues.email}
                  onChange={handleUserEdit}
                />
              ) : (
                <div className="data">{params.row.email}</div>
              )}
            </div>
          )
        }
      },
      {
        field: 'role',
        headerName: 'Role',
        renderCell: params => {
          return (
            <div className="employee-row">
              {selectedRowId === params.row.id ? (
                <input
                  className={`data${params.row.isChecked ? ' checked' : ''}${
                    selectedRowId === params.row.id ? ' editable' : ' normal'
                  }`}
                  name="role"
                  value={newValues.role}
                  onChange={handleUserEdit}
                />
              ) : (
                <div className="data">{params.row.role}</div>
              )}
            </div>
          )
        }
      },
      {
        field: 'action',
        headerName: 'Action',
        renderCell: params => {
          return (
            <div className="actions">
              {selectedRowId === params.row.id ? (
                <>
                  <span className="icon" onClick={handleSave}>
                    <Icon icon="akar-icons:check-box-fill" color="#00a8ff" width="20" />
                  </span>
                  <span className="icon" onClick={handleCancel}>
                    <Icon icon="emojione-monotone:cross-mark-button" color="red" width="20" />
                  </span>
                </>
              ) : (
                <>
                  <span className="icon" onClick={() => onEditClick(params?.row.id)}>
                    <Icon icon="bx:edit" color="#484848" width="20" />
                  </span>
                  <span className="icon" onClick={() => handleDeleteClick(params.row.id)}>
                    <Icon icon="ant-design:delete-twotone" color="#d11a2a" width="20" />
                  </span>
                </>
              )}
            </div>
          )
        }
      }
    ]
  }, [selectedRowId, rowData, filteredData, newValues])

  return {
    totalNumberOfPages,
    searchBoxProps: {
      searchText,
      setSearchText
    },
    deleteButtonProps: {
      handleBatchDelete,
      anyBoxChecked
    },
    tableProps: {
      dataInPage,
      columns,
      handleSelect
    },
    paginationProps: {
      page,
      onChange: (e, page) => handlePageChange(page),
      count: totalNumberOfPages
    }
  }
}
export default useDashboard
