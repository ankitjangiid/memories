import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

// moment is just to display the time when post was created
import moment from "moment";

import useStyles from "./styles";

// initialising dispatch to delete a post
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      {/* Image Background */}
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />

      {/* Overlay on background image */}
      <div className={classes.overlay}>
        {/* Creator */}
        <Typography variant="h6">{post.creator}</Typography>

        {/* Time */}
        <Typography variant="body2">
          {/* '.fromNow' is used to display time passed since post created(like 2sec, 2min etc) */}
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      {/* Edit Option Icon */}
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>

      {/* Tags */}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>

      {/* Title */}
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>

      {/* Message */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>

      {/* Buttons */}
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpAltIcon fontSize="small" />
          {/* &nbsp is for space */}
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>

        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
