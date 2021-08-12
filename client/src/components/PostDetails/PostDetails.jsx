import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
// this is just a library which deals with time
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../actions/posts";
import useStyles from "./styles";
import background from "../../images/background.jpg";

const Post = () => {
  // here the 'post' is comming from reducer getPost
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  // getting the id from url
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));

    // below line is just to hide warning
    // eslint-disable-next-line
  }, [id]);

  // you can have multiple useEffect per component
  useEffect(() => {
    if (post) {
      // below line is just to hide warning
      // eslint-disable-next-line
      // here we're searching posts with the same tags as current post
      dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }));
    }
  }, [post]);

  if (!post) return null;

  // to open a post
  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress style={{ color: "#FF7F7F" }} size="7em" />
      </Paper>
    );
  }

  // here we specify that show all posts with same tags and in that posts don' show the current post
  // here we filter posts and show posts other then current post (which us post._id)
  // console.log(posts);
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>

          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>

          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>

          <Typography variant="h6">Created by: {post.name}</Typography>

          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>

          <Divider style={{ margin: "40px 0 20px 0" }} />
        </div>

        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || background} alt={post.title} />
        </div>
      </div>

      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>

          {/* Below in map we use slice to only display 5 posts */}

          <div className={classes.recommendedPosts}>
            {recommendedPosts
              .slice(0, 5)
              .map(({ title, name, message, likes, selectedFile, _id }) => (
                <Paper elevation={4} className={classes.recommendedPost}>
                  <div
                    style={{ margin: "20px", cursor: "pointer" }}
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <Typography gutterBottom variant="h6">
                      {title}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {name}
                    </Typography>
                    <Typography gutterBottom color="textSecondary" variant="subtitle2">
                      {message.split(" ").splice(0, 30).join(" ")}...
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                      Likes: {likes.length}
                    </Typography>
                    <img
                      src={selectedFile}
                      style={{ borderRadius: 10 }}
                      alt="Post Background"
                      width="200px"
                    />
                  </div>
                </Paper>
              ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;
