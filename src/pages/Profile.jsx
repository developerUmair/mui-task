import { Background } from "../utils/helpers";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Stack,
  Box,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { logout, profile } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/auth/sign-in");
  };

  return (
    <Background>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          px: 2,
        }}
      >
        <Card
          sx={{
            width: 360,
            p: 3,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <CardContent>
            <Stack spacing={2} alignItems="center">
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "primary.main",
                  fontSize: 32,
                }}
              >
                {profile?.name[0]}
              </Avatar>
              <Typography variant="h6" fontWeight="bold" color="white">
                {profile?.name}
              </Typography>
              <Typography variant="body1" color="white">
                {profile?.email}
              </Typography>
              <Button
                variant="contained"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ mt: 2, width: "100%" }}
              >
                Logout
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Background>
  );
};

export default Profile;
