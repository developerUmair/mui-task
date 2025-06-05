import { Box, Button, Container, Paper, Typography } from "@mui/material";
import ReusableInput from "../Components/ReusableInput";
import { useState } from "react";
import { Background } from "../utils";
import { signUp } from "../services";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signUp(formData);
      if (response.success === true) {
        sessionStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <>
      <Background>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={8}
            sx={{
              width: "100%",
              maxWidth: 500,
              p: 4,
              borderRadius: 4,
              border: "2px solid #243B55",
              background: "rgba(255, 255, 255, 0.95)",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#243B55" }}
            >
              Sign Up to Get Started!
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <ReusableInput
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <ReusableInput
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <ReusableInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1,
                  backgroundColor: "#243B55",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#1b2e45",
                  },
                }}
              >
                Create Account
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link
                  to="/auth/sign-in"
                  underline="hover"
                >
                  Sign in
                </Link>
              </Typography>
            </form>
          </Paper>
        </Box>
      </Background>
    </>
  );
};

export default SignUp;
