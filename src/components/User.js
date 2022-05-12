import React, { useEffect, useState } from "react";
import "./User.css";
import { Icon } from "@iconify/react";

const User = ({
    row,
    handleSelect,
    handleDeleteClick,
    handleEdit,
    onEditClick,
    flag,
}) => {
    const orgValue = { ...row };
    const [editMode, setEditMode] = useState(false);
    const [newValues, setNewValues] = useState(orgValue);

    const onCheck = () => {
        handleSelect(row.id);
    };

    const handleUserEdit = (e) => {
        if (editMode) {
            const name = e.target.name;
            const value = e.target.value;
            setNewValues({ ...newValues, [name]: value });
        }
    };

    const handleSave = () => {
        handleEdit(newValues);
        setEditMode(false);
        onEditClick(null);
    };

    const handleCancel = () => {
        setNewValues(orgValue);
        setEditMode(false);
        onEditClick(null);
    };

    const handleEditClick = () => {
        onEditClick(row.id);
    };

    const handleDelete = () => {
        handleDeleteClick(row.id);
    };

    useEffect(() => {
        flag === row.id ? setEditMode(true) : setEditMode(false);
    }, [flag, row.id]);

    return (
        <>
            <tr className={row.isChecked ? "checked" : ""}>
                <td>
                    <input
                        type="checkbox"
                        onChange={onCheck}
                        checked={row.isChecked ? "checked" : ""}
                    />
                </td>
                <td>
                    <div className="employee-row">
                        <input
                            className={`data${row.isChecked ? " checked" : ""}${
                                editMode ? " editable" : " normal"
                            }`}
                            name="name"
                            value={newValues.name}
                            onChange={handleUserEdit}
                        />
                    </div>
                </td>
                <td>
                    <div className="employee-row">
                        <input
                            className={`data${row.isChecked ? " checked" : ""}${
                                editMode ? " editable" : " normal"
                            }`}
                            name="email"
                            value={newValues.email}
                            onChange={handleUserEdit}
                        />
                    </div>
                </td>
                <td>
                    <div className="employee-row">
                        <input
                            className={`data${row.isChecked ? " checked" : ""}${
                                editMode ? " editable" : " normal"
                            }`}
                            name="role"
                            value={newValues.role}
                            onChange={handleUserEdit}
                        />
                    </div>
                </td>
                <td>
                    <div className="actions">
                        {editMode ? (
                            <>
                                <span className="icon" onClick={handleSave}>
                                    <Icon
                                        icon="akar-icons:check-box-fill"
                                        color="#00a8ff"
                                        width="20"
                                    />
                                </span>
                                <span className="icon" onClick={handleCancel}>
                                    <Icon
                                        icon="emojione-monotone:cross-mark-button"
                                        color="red"
                                        width="20"
                                    />
                                </span>
                            </>
                        ) : (
                            <>
                                <span
                                    className="icon"
                                    onClick={handleEditClick}
                                >
                                    <Icon
                                        icon="bx:edit"
                                        color="#484848"
                                        width="20"
                                    />
                                </span>
                                <span className="icon" onClick={handleDelete}>
                                    <Icon
                                        icon="ant-design:delete-twotone"
                                        color="#d11a2a"
                                        width="20"
                                    />
                                </span>
                            </>
                        )}
                    </div>
                </td>
            </tr>
        </>
    );
};
export default User;
