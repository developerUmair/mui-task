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
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AccountCircle, Logout } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { label: "Popular", to: "/popular" },
    { label: "Top Rated", to: "/top-rated" },
    { label: "Trending", to: "/trending" },
    { label: "Movies", to: "/explore/movies" },
    { label: "Tv Shows", to: "/explore/tv" },
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
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 1 }}
            >
              <MovieCreationIcon fontSize="large" />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                color: "white",
              }}
            >
              MovieMania
            </Typography>
          </Link>

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    width: 250,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background:
                      "linear-gradient(180deg, #0f2027, #203a43, #2c5364)",
                    color: "white",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                    paddingY: 2,
                  },
                }}
              >
                <Box
                  sx={{ width: "100%" }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <Box sx={{ px: 2, mb: 2 }}>
                    <Typography variant="h6" fontWeight={700} letterSpacing={1}>
                      Movie Mania
                    </Typography>
                  </Box>

                  <List>
                    {navLinks.map(({ label, to }) => (
                      <Link
                        to={to}
                        key={to}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <ListItem
                          button
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                              transform: "scale(1.02)",
                              transition: "all 0.3s ease",
                            },
                            mx: 1,
                            borderRadius: 1,
                          }}
                        >
                          <ListItemText
                            primary={label}
                            primaryTypographyProps={{
                              fontWeight: 500,
                              letterSpacing: 0.5,
                            }}
                          />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Box>
                <Box sx={{ px: 2, pb: 2 }}>
                  <Link
                    to="/profile"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={
                        <Avatar sx={{ width: 24, height: 24 }}>
                          <AccountCircle />
                        </Avatar>
                      }
                      sx={{
                        color: "white",
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        justifyContent: "flex-start",
                        textTransform: "none",
                        fontWeight: 500,
                      }}
                    >
                      Profile
                    </Button>
                  </Link>
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
              <Link
                to="/profile"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Tooltip title="Open Profile">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar>
                      <AccountCircle />
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
