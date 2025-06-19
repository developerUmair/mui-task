import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Container maxWidth="xl" disableGutters>
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default AppLayout;
