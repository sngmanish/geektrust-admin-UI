import { useEffect, useState } from 'react'

const usePagination = ({ initialPage = 1, initialPageSize = 10, onChange }) => {
  const [pagination, setPagination] = useState({
    page: initialPage,
    pageSize: initialPageSize
  })

  useEffect(() => {
    if (initialPage !== pagination.page) setPagination({ ...pagination, page: initialPage })
  }, [initialPage])

  useEffect(() => {
    if (initialPage !== pagination.pageSize)
      setPagination({ ...pagination, pageSize: initialPageSize })
  }, [initialPageSize])

  useEffect(() => {
    onChange && onChange(pagination.page, pagination.pageSize)
  }, [pagination.page, pagination.pageSize])

  const handlePageChange = page => setPagination({ ...pagination, page })
  const handlePageSizeChange = pageSize => setPagination({ ...pagination, page: 1, pageSize })

  return {
    page: pagination.page,
    pageSize: pagination.pageSize,
    handlePageChange,
    handlePageSizeChange
  }
}

export default usePagination
