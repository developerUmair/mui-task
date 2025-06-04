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
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h6">🎬 MovieMania</Typography>
          <Typography variant="body2" color="gray">
            Your daily dose of movies
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 3 }}>
          {["Home", "About", "Contact"].map((text) => (
            <Link
              key={text}
              href="#"
              underline="none"
              sx={{
                color: "gray",
                fontWeight: 500,
                letterSpacing: 0.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "white",
                  transform: "scale(1.05)",
                  textDecoration: "underline",
                },
              }}
            >
              {text}
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
