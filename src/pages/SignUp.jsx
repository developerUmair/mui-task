import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import ReusableInput from "../Components/ReusableInput";
import { useContext, useState } from "react";
import { Background } from "../utils/helpers";
import { signUp } from "../services";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const SignUp = () => {
  const { login, setProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await signUp(formData);
      if (response.success === true) {
        setProfile(response?.data?.user);
        const token = response.data.token;
        if (token) {
          login(token);
          navigate("/");
        }
      }
    } catch (err) {
      toast.error(err?.response?.data.message);
    } finally {
      setLoading(false);
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
            backgroundImage: `url(/images/auth-bg.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Paper
            elevation={8}
            sx={{
              width: "100%",
              maxWidth: 500,
              p: 4,
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#fff" }}
            >
              Sign Up to Get Started!
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 1 }}>
                <ReusableInput
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <ReusableInput
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{
                    pattern: "^[a-zA-Z0-9._%+-]+@gmail\\.com$",
                    title:
                      "Only valid Gmail addresses are allowed (e.g., example@gmail.com)",
                  }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <ReusableInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  showToggle={true}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  fullWidth
                  inputProps={{
                    pattern: "^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,}$",
                    title:
                      "Password must be 6 characters long and include capital letter, number, and a special character.",
                  }}
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
                {loading ? <CircularProgress size="30px" /> : "Create Account"}
              </Button>
              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, color: "white" }}
              >
                Already have an account?{" "}
                <Link to="/auth/sign-in" underline="hover">
                  Sign In
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
