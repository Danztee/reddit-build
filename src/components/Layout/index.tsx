import React from "react";
import Navbar from "../Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="mt-[3.2rem]">{children}</main>
    </>
  );
};
export default Layout;
