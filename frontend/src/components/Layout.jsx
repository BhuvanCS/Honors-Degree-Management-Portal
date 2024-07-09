import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "./shared/Footer";
import AppBarCustom from "./shared/AppBarCustom";


const Layout = ({ mode, toggleColorMode }) => {
  return (
    <div>
      <AppBarCustom mode={mode} toggleColorMode={toggleColorMode} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
