import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import Logo from "../../images/Logo.png";
import avatar from "../../images/user.png";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const Navbar = () => {
  // to user which is logged in
  // in there we're immediately get the data from localStorage where we save our users data by the name "profile" in 'reducers->auth.js' file
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  // it keeps the track of our location
  const location = useLocation();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    // to redirect to home route
    // history.push("/");
    // to reload page after logout
    window.location.reload(false);

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    // JWT... JSON web token
    // here we're checking if the token has expired then logout that user
    if (token) {
      const decodedToken = decode(token);

      // here we're checking if the token has expired or not *1000 is for a certan time in  millisecound
      //  and if that is smaller then current time in millisecound
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
    //  here we write change on location because location is tracking our location,
    //  so when our location change or when we successfully log in we redirect to home route and that chanhe the location which will trigger this useEffect

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        {/* <img src={memoriesText} alt="icon" height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" /> */}
        <img src={Logo} alt="Logo" height="40px" />
      </Link>

      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.avatar} alt={user?.result.name} src={user?.result.imageUrl}>
              {/* this is for when there isn't any profile we simply return first char of user name as avatar */}
              {/* {user?.result.name.charAt(0)} */}
              <img src={avatar} alt="Avatar" />
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.authButton}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : window.location.pathname !== "/auth" ? (
          <div className={classes.profile}>
            <Button component={Link} to="/auth" variant="contained" className={classes.authButton}>
              Sign In
            </Button>
          </div>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
