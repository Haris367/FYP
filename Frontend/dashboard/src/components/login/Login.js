import * as React from "react";
import { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Container,
  TextField,
  Typography,
  Link,
  Grid,
  Box,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import "./login.css";

const data = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  // Add more users as needed
];

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  let navigate = useNavigate();
  const handleLogin = () => {
    setError("");
    if (!username || !password) {
      if (!username) {
        setIsUsernameInvalid(true);
      } else {
        setIsUsernameInvalid(false);
      }

      if (!password) {
        setIsPasswordInvalid(true);
      } else {
        setIsPasswordInvalid(false);
      }

      setError("Please fill in both the username and password fields.");
      return;
    }
    const user = data.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      // Successful login
      navigate("/dashboard");
    } else {
      // Failed login
      setIsUsernameInvalid(true);
      setIsPasswordInvalid(true);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "88px",
            marginRight: "10px",
            display: "flex",
            height: 500,
            width: 500,
            flexDirection: "column",
            alignItems: "center",
            border: "5px solid #d9fae7",
            padding: "15px",
            boxShadow: 10,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#2ecc71" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LogIn
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Admin Id"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              error={isUsernameInvalid} // Use the 'error' prop
              helperText={isUsernameInvalid ? "This field is required" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              error={isPasswordInvalid} // Use the 'error' prop
              helperText={isPasswordInvalid ? "This field is required" : ""}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              onClick={handleLogin}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: "#2ecc71",
                "&:hover": { bgcolor: "#57eb95" },
              }}
            >
              Login
            </Button>
            {error && (
              <p style={{ color: "red", marginLeft: "60px" }}>{error}</p>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" style={{ marginLeft: "176px" }}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
