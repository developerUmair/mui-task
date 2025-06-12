import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        py: 4,
        px: 2,
        color: "white",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ fontWeight: "bold"}}>
          🎬 MovieMania
        </Typography>
        <Typography variant="body2" color="gray" mb={2}>
          Your daily dose of movies
        </Typography>
        <Typography variant="body2" color="gray">
          All rights reserved © {currentYear}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
