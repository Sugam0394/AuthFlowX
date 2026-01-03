import React from "react";

const ToolsTable = ({ tools, onApprove, onDelete, cancelDelete, confirmDelete, onReject, deleteId }) => {
  return (

  <div className="tools-table-wrapper">    


    <table className="tools-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tools.map((tool) => (
          <tr key={tool._id}>
            <td>{tool.name}</td>
            <td>{tool.status}</td>
            <td>{tool.category || "-"}</td>
            <td>
              {tool.status === "pending" && (
                <><button className="approve" onClick={() => onApprove(tool._id)}>
                  Approve
                </button>
                <button className="reject" onClick={() => onReject(tool._id)}>
                  Reject
                </button>
                </>
              )}
              <button className="delete" onClick={() => onDelete(tool._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
    {/* ✅ DELETE CONFIRM MODAL */}
    {deleteId && (
      <div className="delete-modal">
        <p>Are you sure you want to delete this tool?</p>
        <button className="confirm" onClick={confirmDelete}>Yes, Delete</button>
        <button className="cancel" onClick={cancelDelete}>Cancel</button>
      </div>

    )}
    </div>
  );
};

export default ToolsTable;
