import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const Dashboard = () => {
  const store = useUserStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await fetch("https://gisapis.manpits.xyz/api/logout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${store.userToken}`,
        },
      });
      if (res.ok) {
        store.updateUserToken("");
        navigate("/");
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <div className="w-full flex flex-row justify-between px-[40px] navbar bg-base-100 sticky top-0 z-40 py-4 lg:hidden">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <Link to="/" className="btn btn-ghost normal-case text-lg">
            GIS 2005551020
          </Link>
        </div>
        <div className="py-20 w-full">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 lg:w-60 w-80 min-h-full bg-base-200 text-base-content flex flex-col gap-4 py-10 items-start">
          {/* Sidebar content here */}
          <li>
            <Link to="" className="btn btn-ghost normal-case text-lg w-full">
              GIS 2005551020
            </Link>
          </li>
          <li className="w-full" tabIndex={0}>
            <details>
              <summary>Master Data</summary>
              <ul className="p-2 flex flex-col gap-2">
                <li>
                  <Link to="/dashboard/mregion">Region</Link>
                </li>
                <li>
                  <Link to="/dashboard/meksisting">Perkerasan Jalan</Link>
                </li>
                <li>
                  <Link to="/dashboard/mjenisjalan">Jenis Jalan</Link>
                </li>
                <li>
                  <Link to="/dashboard/mkondisi">Kondisi Jalan</Link>
                </li>
              </ul>
            </details>
          </li>
          <li className="w-full">
            <Link to="/dashboard/ruas-jalan">Ruas Jalan</Link>
          </li>
          <button
            className="btn btn-primary w-full bottom-0"
            onClick={handleLogout}
          >
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
