import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Grow,
  Typography,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";

import useStyles from "./styles";

const Footer = () => {
  const classes = useStyles();
  const { isLoading } = useSelector((state) => state.posts);

  if (isLoading === true) return null;

  return (
    <Grow in>
      <Container maxWidth="xl" className={classes.Container}>
        <Typography>Footer</Typography>
      </Container>
    </Grow>
  );
};

export default Footer;
