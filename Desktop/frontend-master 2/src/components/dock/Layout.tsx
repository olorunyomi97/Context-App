import React from "react";

//components
import Navbar from "components/dock/Navbar";
import Footer from "components/dock/Footer";

interface LayoutProps {
  isNav?: boolean;
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children, isNav }: LayoutProps) => {
  return (
    <div>
      <Navbar isNav={isNav} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
