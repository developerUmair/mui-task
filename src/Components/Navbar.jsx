import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 1 }}>
            <MovieCreationIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 1,
              color: "white",
            }}
          >
            MovieMania
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              "& button": {
                fontWeight: 600,
                letterSpacing: 0.5,
                color: "white",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "scale(1.05)",
                },
              },
            }}
          >
            <Link to="/popular" style={{ textDecoration: "none" }}>
              <Button color="inherit">Popular</Button>
            </Link>
            <Link to="/top-rated" style={{ textDecoration: "none" }}>
              <Button color="inherit">Top Rated</Button>
            </Link>
            <Link to="/upcoming" style={{ textDecoration: "none" }}>
              <Button color="inherit">Upcoming</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
