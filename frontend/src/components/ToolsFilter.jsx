import React from "react";

const ToolsFilters = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="tools-filters">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
        <option value="">All Categories</option>
        <option value="AI">AI</option>
        <option value="Productivity">Productivity</option>
        <option value="Design">Design</option>
        <option value="Development">Development</option>
        <option value="Marketing">Marketing</option>
        <option value="Education">Education</option>
        <option value="Finance">Finance</option>
      </select>

      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
      </select>
    </div>
  );
};

export default ToolsFilters;
