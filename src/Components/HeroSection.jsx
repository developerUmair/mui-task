import React from "react";
import { Box, TextField, Typography, Container } from "@mui/material";
import SectionTitle from "./SectionTitle";

const HeroSection = () => {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        background: "linear-gradient(to right, #3f51b5, #5a55ae)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Movie App
        </Typography>
        <Typography variant="h6" gutterBottom>
          Search for Movies, TV Shows, and Celebrities
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          sx={{
            mt: 3,
            backgroundColor: "white",
            borderRadius: 1,
            input: {
              color: "#000",
            },
          }}
        />
      </Container>
    </Box>
  );
};

export default HeroSection;
