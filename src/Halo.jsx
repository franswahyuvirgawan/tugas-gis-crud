// App.js
import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import MapCluster from "./pages/MapCluster";
import Polyline from "./pages/Polyline";
import MapRouting from "./pages/MapRouting";

const Halo = () => {
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
        {currentPage === "map-routing" && <MapRouting />}
      </Layout>
    </div>
  );
};

export default Halo;
