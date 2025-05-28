import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        p: 2,
        color: "white",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h6">🎬 MovieMania</Typography>
          <Typography variant="body2" color="gray">
            Your daily dose of movies
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="#" color="gray" underline="hover">
            Home
          </Link>
          <Link href="#" color="gray" underline="hover">
            About
          </Link>
          <Link href="#" color="gray" underline="hover">
            Contact
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
