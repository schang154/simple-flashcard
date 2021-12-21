import React, { useState } from "react";
import { AUTH } from "../../constants/actionTypes";
import { signIn, signUp } from "../../actions/auth";
import { navigate } from "gatsby";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { Button, Paper, Grid, Typography, Container } from "@mui/material";
import Input from "../Input/Input";
import { emphasize } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const SignUpOrInText = isSignUp ? "Sign Up" : "Sign In";
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUp(formData));
    } else {
      dispatch(signIn(formData));
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchSignMode = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const googleSignInSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate("/app/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const googleSignInFailure = (error) => {
    console.log(`Sign in Failed: ${error}`);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 4, py: 1, px: 2 }}>
        <Typography
          variant="h5"
          sx={{ my: 3, textAlign: "center", alignItems: "center" }}
        >
          {SignUpOrInText}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type={"password"}
                handleShowPassword={handleChange}
              />
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {SignUpOrInText}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <GoogleLogin
                clientId={process.env.GATSBY_GOOGLE_LOGIN_CLIENTID}
                render={(renderProps) => (
                  <Button
                    color="primary"
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<GoogleIcon />}
                    variant="contained"
                  >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSignInSuccess}
                onFailure={googleSignInFailure}
                cookiePolicy="single_host_origin"
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              justifyContent: "end",
            }}
          >
            <Grid item>
              <Button
                sx={{
                  mt: 2,
                  fontSize: { xs: 10, sm: 14 },
                  "&:hover": {
                    color: emphasize("#000", 0.35),
                  },
                }}
                onClick={switchSignMode}
              >
                {isSignUp
                  ? `Already have an account? Sign In`
                  : `Don't have an account? Sign Up`}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
