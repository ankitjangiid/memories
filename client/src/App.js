import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Password_forgot from "./components/Auth/Password_forgot/Password_forgot";
import Password_reset from "./components/Auth/Password_reset/Password_reset";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
          <Route
            path="/auth/forgot_password"
            exact
            component={() => (user ? <Redirect to="/posts" /> : <Password_forgot />)}
          />
          <Route
            path="/auth/reset_password/:token"
            exact
            component={() => (user ? <Redirect to="/posts" /> : <Password_reset />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
