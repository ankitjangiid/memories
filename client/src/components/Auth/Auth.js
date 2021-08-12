import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import LockIcon from "../../images/locked.png";

import Icon from "./icon";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";

import { useSelector } from "react-redux";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const { invalidPassword, invalidUser, userExist, passwordDoesntMatch } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  // To switch the button for signin and signup
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // Sign Up
      // we pass formData to save in database and we pass the histroy so that we can navigate once something happen
      dispatch(signup(form, history));
    } else {
      // Sign In
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    // console.log(res);
    // '?.' is a special operator that's not gonna throw an error is we don' thave res object
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      // to go to home route once we successfully logged in
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log("Google Sign In was unsuccessful. Try again later");

  const handleChange = (e) => {
    // here we'll only update the data which we're managing at the time
    // like if we're on lastName then only change the lastName
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <img src={LockIcon} alt="Lock Icon" height="25px" />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* only if signup is true then run this */}
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              showError={invalidUser || userExist ? true : false}
              helperText={
                invalidUser ? "User doesn't exist" : "" || userExist ? "User already exist" : ""
              }
            />

            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              showError={invalidPassword ? true : false}
              helperText={invalidPassword ? "Invalid Password" : ""}
            />

            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
                showError={passwordDoesntMatch ? true : false}
                helperText={passwordDoesntMatch ? "Password doesn't match" : ""}
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            // render is used to change and made how you want to make the button look like
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />

          <Grid container justify="center">
            <Grid item>
              <Button onClick={switchMode} className={classes.switchMode}>
                {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
