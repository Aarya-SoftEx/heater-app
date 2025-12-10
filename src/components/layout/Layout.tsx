import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="main">
      <div className="main-content home-bg">
        <Navbar />
        {children}
      </div>
    </main>
  );
};

export default Layout;
