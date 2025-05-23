import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Movie App
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit">Popular</Button>
            <Button color="inherit">Top Trending</Button>
            <Button color="inherit">Upcoming</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
