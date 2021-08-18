import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button, Paper, Grid, Typography, Container, Snackbar } from "@material-ui/core";
import forgotPassIcon from "../../../images/forgotPass.png";
import Input from "../Input";
import { forgot_password } from "../../../actions/auth";
import { useSelector } from "react-redux";
import { FIELD_RESET } from "../../../constants/actionTypes";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "./styles";

const Password_forgot = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { invalidUser, showSnackbar } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgot_password(email));
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    dispatch({ type: FIELD_RESET });
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: FIELD_RESET });
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <img src={forgotPassIcon} alt="Lock Icon" height="25px" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password?
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              showError={invalidUser ? true : false}
              helperText={invalidUser ? "User doesn't exist" : ""}
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Reset Link
          </Button>
        </form>

        <Snackbar open={showSnackbar} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Reset link send to your registered email address
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Password_forgot;
