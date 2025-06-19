import { Container } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
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
