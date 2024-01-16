import React from "react";

//components
import Sidebar from "components/partials/Sidebar";
import Topnav from "components/partials/Topnav";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <Topnav />
        {children}
      </div>
    </div>
  );
};

export default Layout;
