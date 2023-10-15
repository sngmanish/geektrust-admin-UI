import React from "react";

const DeleteButton = ({ anyBoxChecked, handleBatchDelete }) => {
  return (
    <button
      style={{
        width: "9rem",
        height: "2rem",
        color: "#7f8fa6",
        backgroundColor: "#dcdde1",
        border: "1px solid #7f8fa6",
        outline: "none",
        borderRadius: "1rem",
        ...(anyBoxChecked && {
          border: "none",
          backgroundColor: "#e74c3c",
          color: "#fff",
        }),
      }}
      disabled={!anyBoxChecked ? "disabled" : ""}
      onClick={handleBatchDelete}
    >
      Delete Selected
    </button>
  );
};

export default DeleteButton;
