import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
// it is used to fetch the data from that global redux store
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  // here state  is the whole global store/state
  // here state.posts is from reducers/index.js where we named it 'posts'
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return "No posts";

  return isLoading ? (
    <div className={classes.loading}>
      <CircularProgress style={{ color: "#FF7F7F" }} />
    </div>
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
