import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
// this is hook to use redux much more easily
import { useDispatch } from "react-redux";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPosts } from "../../actions/posts";

const Home = () => {
  //   const classes = useStyles();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  // here as soon as program runs we dispatch all the posts by calling getPosts
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div>
      {/* grow provides an simple animation */}
      <Grow in>
        <Container>
          <Grid
            // className={classes.mainContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
