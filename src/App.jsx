// App.js
import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import MapCluster from "./pages/MapCluster";
import Polyline from "./pages/Polyline";

const App = () => {
  // Retrieve the currentPage value from localStorage or use the default value "cluster-marker"
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage") || "cluster-marker"
  );

  // Update the localStorage whenever currentPage changes
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  console.log(currentPage);

  return (
    <div>
      <Layout onNavigate={handleNavigate}>
        {currentPage === "cluster-marker" && <MapCluster />}
        {currentPage === "polyline" && <Polyline />}
      </Layout>
    </div>
  );
};

export default App;
