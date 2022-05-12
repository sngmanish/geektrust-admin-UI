import React, { useEffect, useState } from "react";
import User from "./User";
import Pagination from "./Pagination";
import "./Table.css";
import config from "../config/index";

const Table = ({
    user,
    handleSelect,
    handleDeleteClick,
    handleBatchDelete,
    handleEdit,
}) => {
    const maxRow = config.MAX_ROW;
    const [page, setPage] = useState(1);
    const [dataInPage, setDataInPage] = useState(
        user.slice((page - 1) * maxRow, (page - 1) * maxRow + maxRow)
    );
    const [flag, setFlag] = useState(null);
    const [anyBoxChecked, setAnyBoxChecked] = useState(false);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(
        Math.ceil(user.length / maxRow)
    );
    const currentDataInPage = () => {
        const start = (page - 1) * maxRow;
        const end = start + maxRow;
        setDataInPage(user.slice(start, end));
    };
    const onEditClick = (id) => setFlag(id);
    const handleTopCheckBox = (e) => {
        //console.log(e.target.checked)
        if (e.target.checked) {
            dataInPage.map((x) => !x.isChecked && handleSelect(x.id));
        } else {
            dataInPage.map((x) => x.isChecked && handleSelect(x.id));
        }
    };
    const anyBoxCheck = (user) => {
        setAnyBoxChecked(
            user.reduce((i, member) => i || member.isChecked, false)
        );
    };
    useEffect(() => {
        anyBoxCheck(user);
        setTotalNumberOfPages(Math.ceil(user.length / maxRow));
    }, [user]);
    useEffect(() => {
        currentDataInPage();
    }, [user, page]);
    return (
        <>
            <div className="table-container">
                <table>
                    <thead className="tableHead">
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    onChange={handleTopCheckBox}
                                />
                            </th>
                            <th>
                                <div className="data">Name</div>
                            </th>
                            <th>
                                <div className="data">Email</div>
                            </th>
                            <th>
                                <div className="data">Role</div>
                            </th>
                            <th>
                                <div className="data">Actions</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataInPage.map((user) => (
                            <User
                                key={user.id}
                                row={user}
                                handleSelect={handleSelect}
                                handleDeleteClick={handleDeleteClick}
                                handleEdit={handleEdit}
                                onEditClick={onEditClick}
                                flag={flag}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="delete-and-pagination-area">
                <div className="delete-button">
                    <button
                        className={`dlt-btn ${
                            !anyBoxChecked ? " not-active " : ""
                        }`}
                        disabled={!anyBoxChecked ? "disabled" : ""}
                        onClick={handleBatchDelete}
                    >
                        Delete Selected
                    </button>
                </div>
                
                <div className="pagination">
                    {totalNumberOfPages > 1 && (
                        <Pagination
                            page={page}
                            setPage={setPage}
                            totalNumberOfPages={totalNumberOfPages}
                            maxRow={maxRow}
                        />
                    )}
                </div>
                
            </div>
        </>
    );
};

export default Table;
