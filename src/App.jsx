import React from "react";
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/Dashboard";
import Daftar from "./pages/Daftar";
import Edit from "./pages/Edit";
import EksistingJalan from "./pages/EksistingJalan";
import JenisJalan from "./pages/JenisJalan";
import KondisiJalan from "./pages/KondisiJalan";
import Login from "./pages/Login";
import Region from "./pages/Region";
import RuasJalan from "./pages/RuasJalan";
import SemuaDataUser from "./pages/SemuaDataUser";
import Tambah from "./pages/Tambah";
import useUserStore from "./store/userStore";

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
          <Route element={<Dashboard />}>
            <Route path="/" element={<SemuaDataUser />} />
            <Route path="/mregion" element={<Region />} />
            <Route path="/meksisting" element={<EksistingJalan />} />
            <Route path="/mjenisjalan" element={<JenisJalan />} />
            <Route path="/mkondisi" element={<KondisiJalan />} />
            <Route path="/ruas-jalan" element={<RuasJalan />} />
            <Route path="/tambah" element={<Tambah />} />
            <Route path="/edit" element={<Edit />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
