import { useEffect, useMemo, useState } from "react";
import { getAdminUIData } from "../../services/adminData";
import config from "../../config";
import usePagination from "../../components/Pagination/usePagination";

const useDashboard = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { page, pageSize, handlePageChange } = usePagination({
    initialPage: 1,
    initialPageSize: config.MAX_ROW,
  });

  //   Fetch data
  useEffect(() => {
    getAdminUIData()
      .then((res) => {
        setData(
          res.map((row) => ({
            ...row,
            isChecked: false,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   Search data
  const filteredData = useMemo(() => {
    if (searchText.length > 0) {
      return data.filter((user) => {
        if (
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase()) ||
          user.role.toLowerCase().includes(searchText.toLowerCase())
        )
          return user;
      });
    } else {
      return data;
    }
  }, [searchText, data]);

  const handleDeleteClick = (id) => {
    let allUser = [...data];
    allUser = allUser.filter((user) => user.id !== id);
    setData(allUser);
  };

  const handleBatchDelete = () => {
    let allUser = [...data];
    allUser = allUser.filter((user) => !user.isChecked);
    setData(allUser);
  };

  const handleSelect = (id) => {
    let allUser = [...data];
    allUser.forEach((user) => {
      if (user.id === id) {
        user.isChecked = !user.isChecked;
      }
    });
    setData(allUser);
  };

  const handleEdit = (row) => {
    let allUser = [...data];
    allUser = allUser.map((user) => {
      if (user.id === row.id) {
        return Object.assign(user, row);
      }
      return user;
    });
    console.log(allUser);
    setData(allUser);
  };

  const dataInPage = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, page, pageSize]);

  const totalNumberOfPages = useMemo(
    () => Math.ceil(filteredData.length / pageSize),
    [filteredData]
  );

  const anyBoxChecked = useMemo(() => {
    return filteredData.reduce((i, member) => i || member.isChecked, false);
  }, [filteredData]);

  return {
    totalNumberOfPages,
    searchBoxProps: {
      searchText,
      setSearchText,
    },
    deleteButtonProps: {
      handleBatchDelete,
      anyBoxChecked,
    },
    tableProps: {
      handleSelect,
      handleDeleteClick,
      handleEdit,
      dataInPage,
    },
    paginationProps: {
      page,
      onChange: (e, page) => handlePageChange(page),
      count: totalNumberOfPages,
    },
  };
};
export default useDashboard;
