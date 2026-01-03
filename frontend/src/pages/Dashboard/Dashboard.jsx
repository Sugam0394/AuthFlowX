import React from 'react'
import Pagination from './Pagination'
import Filters from './Filters'
import ToolsGrid from './ToolsGrid'
import { fetchAllToolsByUser } from '../../app/ToolReduxSlice'
 import { useDispatch, useSelector } from "react-redux";
 import { useState, useEffect } from 'react'
 import "./Dasboard.css"







function Dashboard() {
  const dispatch = useDispatch();
  const { tools, page, totalPages, } = useSelector(state => state.userTools);


  console.log("TOOLS FROM REDUX:", tools);
console.log("PAGE:", page, "TOTAL:", totalPages);


  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(fetchAllToolsByUser({ page: 1 , search, category, limit: 20 }));
  }, [dispatch,   search, category]);

  const handlePageChange = (newPage) => {
    dispatch(fetchAllToolsByUser({ page: newPage, search, category, limit:20 }));
  };

 





  return (
      <div className="dashboard-container"> <Filters search={search} setSearch={setSearch} category={category} setCategory={setCategory} /> <ToolsGrid tools={tools} /> <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} /> </div>

 

  )
}

export default Dashboard