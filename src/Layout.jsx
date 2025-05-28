import { Container } from "@mui/material";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const Layout = ({ children }) => {
  return (
    <Container maxWidth="xl" disableGutters>
      <Navbar />
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;
