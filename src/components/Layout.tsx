import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="navbar bg-base-200 sticky top-0 z-40 py-4 md:px-[80px] px-[32px] w-full justify-between items-center">
        <div className="w-full lg:w-[50%] flex flex-row justify-between lg:block">
          <p className="btn btn-ghost normal-case text-lg">GIS 2005551020</p>
        </div>
      </div>
      <div className="md:px-[80px] px-[32px] text-xs flex justify-center flex-col items-center gap-[100px] py-[40px] relative z-0">
        {children}
      </div>
      <footer className="footer footer-center p-4 bg-primary text-base-content text-xs lg:text-sm md:px-[80px] px-[32px]">
        <aside>
          <p>
            Copyright © 2023 - Fran's Wahyu Virgawan as the owner and creator.
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Layout;
