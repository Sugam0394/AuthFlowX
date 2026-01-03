import React from 'react'
import { useEffect, useState } from 'react';
 import { useDispatch, useSelector} from 'react-redux';
 import { fetchAllTools } from '../../api/toolsApi';
 import { approveTool, rejectTool, deleteTool } from '../../api/toolsApi';
 import "./tools.css"
 import ToolsFilters from '../../components/ToolsFilter';
 import ToolsTable from '../../components/ToolsTable';
 import Pagination from '../../components/Pagination';
 

function Tools() {
 
const dispatch = useDispatch();

 const { tools, loading, error, page, totalPages } = useSelector(
  (state) => state.tools
);

console.log("Tools from Redux:", tools);


// Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");


  // Delete confirmation state
  const [deleteId , setDeleteId] = useState(null);


 useEffect(() => {
    dispatch(fetchAllTools(1));
  }, [dispatch]);



  
  // 🔹 YAHAN LIKHNA HAI (👇👇👇)
  const handleApprove = async (id) => {
    await dispatch(approveTool(id));
    dispatch(fetchAllTools(page));
  };

  // 🔹 Add handleReject function
const handleReject = async (id) => {
  await dispatch(rejectTool(id));  // Redux action
  dispatch(fetchAllTools(page));    // Refresh the list
};


  
const handleDeleteClick = (id) => {
  setDeleteId(id);
};

const confirmDelete = async () => {
  await dispatch(deleteTool(deleteId));
  setDeleteId(null);
  dispatch(fetchAllTools(page));
};

const cancelDelete = () => {
  setDeleteId(null);
};

  const handlePageChange = (newPage) => {
  dispatch(fetchAllTools(newPage));
};


   // Filtered tools
  const filteredTools = Array.isArray(tools)
    ? tools.filter((tool) => {
        return (
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (categoryFilter ? tool.category === categoryFilter : true) &&
          (statusFilter ? tool.status === statusFilter : true)
        );
      })
    : [];

    console.log("Filtered Tools:", filteredTools);




  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;









  return (
   <div className='tools-container'>
      <h1>Tools Management</h1>


     {/* Filters Component */}
      <ToolsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

        <ToolsTable
         tools={filteredTools}
     onApprove={handleApprove}
      onReject={handleReject}
        onDelete={handleDeleteClick}
        cancelDelete={cancelDelete}
        confirmDelete={confirmDelete}
        deleteId={deleteId}
/>

 

    <Pagination
  page={page}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>
</div>
  )
}

export default Tools