// Halaman1.js
import React from "react";

const Halaman1 = ({ onNavigate }) => {
  return (
    <div>
      <h1>Halaman 1</h1>
      <button onClick={() => onNavigate("halaman2")}>
        Pindah ke Halaman 2
      </button>
    </div>
  );
};

export default Halaman1;
