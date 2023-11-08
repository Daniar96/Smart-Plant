import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { GiPlantWatering } from "react-icons/gi";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import toast, { Toaster } from "react-hot-toast";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../../api/Axios";
import Gdpr from "./Gdpr";
const defaultTheme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

export default function SignUp() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = (status) => {
    setIsChecked(status);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isChecked) {
      toast.error("Please accept GDPR to continue.", { duration: 5000 });
      return;
    }

    const form = event.currentTarget;
    if (form.reportValidity()) {
      const data = new FormData(form);
      const newUser = {
        fullName: data.get("firstName") + " " + data.get("lastName"),
        username: data.get("username"),
        email: data.get("email"),
        admin: "false",
        hashedpassword: data.get("password"),
      };
      try {
        fetch(`http://3.124.188.58/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
      } catch (error) {}
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "#393e46", color: "rgb(45, 215, 45)" }}
            >
              <GiPlantWatering />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Gdpr handleCheckbox={handleCheckbox} />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/"
                    variant="body2"
                    sx={{ fontSize: "16px", textDecoration: "none" }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
