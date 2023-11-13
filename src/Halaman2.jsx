// Halaman2.js
import React from "react";

const Halaman2 = ({ onNavigate }) => {
  return (
    <div>
      <h1>Halaman 2</h1>
      <button onClick={() => onNavigate("halaman1")}>
        Pindah ke Halaman 1
      </button>
    </div>
  );
};

export default Halaman2;
