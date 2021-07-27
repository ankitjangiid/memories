import React, { useState, useEffect } from "react";
import { AppBar, Typography, Avatar, Toolbar, Button } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";
// import logo from "./images/logo.png";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // it keeps the track of our location
  const location = useLocation();

  // to user which is logged in
  // in there we're immediately get the data from localStorage where we save our users data by the name "profile" in 'reducers->auth.js' file
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    // to redirect to home route
    history.push("/");

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
    <AppBar
      className={classes.appBar}
      position="static"
      color="inherit"
      // style={{ backgroundColor: "black" }}
    >
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {/* this is for when there isn't any profile we simply return first char of user name as avatar */}
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              // className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
