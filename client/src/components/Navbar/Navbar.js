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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    window.location.reload(false);
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AppBar
      className={user?.result ? classes.appBarLoggedIn : classes.appBar}
      position="static"
      color="inherit"
    >
      <Link to="/" className={classes.brandContainer}>
        <img src={Logo} alt="Logo" className={user?.result ? classes.logoLoggedIn : classes.logo} />
      </Link>

      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.avatar} alt={user?.result.name} src={user?.result.imageUrl}>
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
