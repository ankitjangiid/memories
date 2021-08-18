import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import resetPassIcon from "../../../images/resetPass.png";
import Input from "../Input";
import { getUserByToken, reset_password } from "../../../actions/auth";
import { useSelector } from "react-redux";
import { FIELD_RESET, PASSWORD_DOESNT_MATCH } from "../../../constants/actionTypes";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "./styles";

const Password_forgot = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const { passwordDoesntMatch, userExistWithThatToken, showSnackbar, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getUserByToken(token));
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(reset_password(password, token));
    } else {
      dispatch({ type: PASSWORD_DOESNT_MATCH });
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
    dispatch({ type: FIELD_RESET });
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: FIELD_RESET });
    history.push("/auth");
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress style={{ color: "#FF7F7F" }} size="4em" />
      </Paper>
    );
  }

  if (!userExistWithThatToken) return <h4> 400 - Bad Request</h4>;

  if (showSnackbar) {
    setTimeout(function () {
      history.push("/auth");
    }, 5000);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <img src={resetPassIcon} alt="Lock Icon" height="25px" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="password"
              label="New Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            <Input
              name="confirmPassword"
              label="Confirm New Password"
              handleChange={handleChange}
              type="password"
              showError={passwordDoesntMatch ? true : false}
              helperText={passwordDoesntMatch ? "Password doesn't match" : ""}
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>
        </form>

        <Snackbar open={showSnackbar} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Password reset successfully
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Password_forgot;
