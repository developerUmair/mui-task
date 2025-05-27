import { Container } from "@mui/material";
import React from "react";
import Navbar from "./Components/Navbar";

const Layout = ({ children }) => {
  return (
    <Container maxWidth="xl" disableGutters>
      <Navbar />
      {children}
    </Container>
  );
};

export default Layout;
