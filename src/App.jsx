import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Daftar from "./pages/Daftar";
import Login from "./pages/Login";
import useUserStore from "./store/userStore";
import NotFound from "./Pages/NotFound";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import SemuaDataUser from "./pages/SemuaDataUser"; // Corrected import
import TotalDataPerUser from "./Pages/TotalDataPerUser";
import MapCluster from "./pages/MapCluster";
import EksistingJalan from "./pages/EksistingJalan";
import JenisJalan from "./pages/JenisJalan";
import KondisiJalan from "./pages/KondisiJalan";
import Region from "./pages/Region";
import RuasJalan from "./pages/RuasJalan";
import Tambah from "./pages/Tambah";
import Edit from "./pages/Edit";

function App() {
  const store = useUserStore();

  const PrivateRoutes = () => {
    let auth = store.userToken;
    return auth ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/daftar"
          element={store.userToken ? <Navigate to="/" /> : <Daftar />}
        />
        <Route
          path="/login"
          element={store.userToken ? <Navigate to="/" /> : <Login />}
        />
        <Route element={<PrivateRoutes />}>
          {/* <Route element={<Layout />}>
            <Route path="/" element={<MapCluster />} />
          </Route> */}
          <Route element={<Dashboard />}>
            {/* Semua Data */}
            <Route
              path="/"
              element={
                <SemuaDataUser // Corrected component name
                  api="https://ppl2.onrender.com/calculated-api"
                  metode="API"
                />
              }
            />
            <Route
              path="/plsql"
              element={
                <SemuaDataUser // Corrected component name
                  api="https://ppl2.onrender.com/calculated-plsql"
                  metode="PL/SQL"
                />
              }
            />

            {/* User Data */}
            <Route
              path="/api/data-user"
              element={
                <SemuaDataUser // Corrected component name
                  api="https://ppl2.onrender.com/user-calculated-api"
                  metode="API"
                />
              }
            />
            <Route
              path="/plsql/data-user"
              element={
                <SemuaDataUser // Corrected component name
                  api="https://ppl2.onrender.com/user-calculated-plsql"
                  metode="PL/SQL"
                />
              }
            />

            {/* Total Data Per User */}
            <Route
              path="/api/total-data-per-user"
              element={
                <TotalDataPerUser apiPerUser="https://ppl2.onrender.com/calculated-api-user" />
              }
            />
            <Route
              path="/plsql/total-data-per-user"
              element={
                <TotalDataPerUser apiPerUser="https://ppl2.onrender.com/calculated-plsql-user" />
              }
            />

            {/* Total Proses User */}
            <Route path="/dashboard/mregion" element={<Region />} />
            <Route path="/dashboard/meksisting" element={<EksistingJalan />} />
            <Route path="/dashboard/mjenisjalan" element={<JenisJalan />} />
            <Route path="/dashboard/mkondisi" element={<KondisiJalan />} />
            <Route path="/dashboard/ruas-jalan" element={<RuasJalan />} />
            <Route path="/dashboard/tambah" element={<Tambah />} />
            <Route path="/dashboard/edit" element={<Edit />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
