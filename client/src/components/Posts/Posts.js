import React from "react";
// it is used to fetch the data from that global redux store
import { useSelector } from "react-redux";

import { Grid, CircularProgress } from "@material-ui/core";

import Post from "./Post/Post";
import useStyles from "./styles";
const Posts = ({ setCurrentId }) => {
  // here state  is the whole global store/state
  // here state.posts is from reducers/index.js where we named it 'posts'
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
export default Posts;
