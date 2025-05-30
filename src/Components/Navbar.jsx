import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { label: "Popular", to: "/popular" },
    { label: "Top Rated", to: "/top-rated" },
    { label: "Trending", to: "/trending" },
  ];

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

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    {navLinks.map(({ label, to }) => (
                      <Link to={to} key={to} style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItem button>
                          <ListItemText primary={label} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
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
              {navLinks.map(({ label, to }) => (
                <Link to={to} key={to} style={{ textDecoration: "none" }}>
                  <Button color="inherit">{label}</Button>
                </Link>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
