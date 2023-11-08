import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/:plantId" element={<Dashboard />} />
    </Routes>
  );
};
export default DashboardRoutes;
