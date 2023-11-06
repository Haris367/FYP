import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { MainContainer } from "./layout.styles";

function Layout({ children }) {
  const location = useLocation();
  const hideHeader = { "/": "hidden" };
  return (
    <React.Fragment>
      {!hideHeader[location.pathname] && <Navbar />}
      {children}
    </React.Fragment>
  );
}

export default Layout;
