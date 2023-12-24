import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../validations/LoginValidations";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
// import * as Yup from 'yup';
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
  InputAdornment,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../../services";
// import Dashboard from "./Dashboard";
import "./login.css";

// const data = [
//   { username: "user1@gmail.com", password: "password1" },
//   { username: "user2", password: "password2" },
//   // Add more users as needed
// ];

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, handleBlur, touched, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        // handleLogin(values);
        try {
          const { email: username, password } = values;
          const payload = { username, password };
          const response = await login(payload);
          const { user, token } = response.data;
          localStorage.setItem("token", token);
          // store the user info in redux

          // navigate("/dashboard");
        } catch (e) {
          console.log(e?.response?.data || e.response?.data?.message);
          if (e.response?.status === 401) {
            errors.email = "Invalid email or password";
            errors.password = "Invalid email or password";
          }
        }
      },
    });

  // const handleLogin = async (values) => {
  // };

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
              values={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={(touched.email && errors.email) || ""}
              // onChange={(e) => setUsername(e.target.value)}
              // error={isUsernameInvalid} // Use the 'error' prop
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              values={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={(touched.password && errors.password) || ""}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      sx={{ height: 25, width: 25, cursor: "pointer" }}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <ShowIcon sx={{ color: "#57eb95" }} />
                      ) : (
                        <HideIcon sx={{ color: "black" }} />
                      )}
                    </Box>
                  </InputAdornment>
                ),
              }}
              // onChange={(e) => setPassword(e.target.value)}
              // error={isPasswordInvalid} // Use the 'error' prop
              // helperText={isPasswordInvalid ? "This field is required" : ""}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              // onClick={handleLogin}
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
            {/* {errors && (
              <p style={{ color: "red", marginLeft: "60px", fontSize: "15px"}}>{errors}</p>
            )} */}
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" style={{ marginLeft: "176px" }}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
