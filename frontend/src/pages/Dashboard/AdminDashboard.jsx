 import React from "react";
 import { useEffect } from "react";
 import { fetchDashboardStats } from "../../app/adminSlice/adminSlice";
 
import {useSelector , useDispatch} from 'react-redux'
import "./AdminDashboard.css";

const AdminDashboard = () => {
 const dispatch = useDispatch();

  const { loading, stats, error } = useSelector(
    (state) => state.admin.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) {
    return <p className="dashboard-loading">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="dashboard-error">{error}</p>;
  }





  return (
       <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p>{stats?.totalUsers ?? 0}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Tools</h3>
          <p>{stats?.totalTools ?? 0}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Reviews</h3>
          <p>{stats?.totalReviews ?? 0}</p>
        </div>
      </div>
    </div>

  );
};

export default AdminDashboard;
