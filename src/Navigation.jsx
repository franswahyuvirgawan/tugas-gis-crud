// Navigation.js
import React from "react";

const Navigation = ({ onNavigate }) => {
  return (
    <div className="w-full text-sm flex flex-col gap-4 items-start">
      <button onClick={() => onNavigate("halaman1")}>1. Tugas CRUD</button>
      <button onClick={() => onNavigate("halaman2")}>
        2. Tugas Polyline CRUD
      </button>
    </div>
  );
};

export default Navigation;
