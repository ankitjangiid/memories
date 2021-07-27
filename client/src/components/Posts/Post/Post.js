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
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
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
  const user = JSON.parse(localStorage.getItem("profile"));

  // Like logic
  const Likes = () => {
    // if there is some like(more than 0) then run this
    if (post.likes.length > 0) {
      // here first we're finding the user in likes, if users id was found in it that means he already liked it
      // so then we check if there is more like than 2 that means user and 2 others liked it, in that case we print You and 2 others
      // if there is less than equal to 2 it means only user liked it or user and someone else
      // then, if user didn't liked it yet then aaccording to that we print something else
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

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
        <Typography variant="h6">{post.name}</Typography>

        {/* Time */}
        <Typography variant="body2">
          {/* '.fromNow' is used to display time passed since post created(like 2sec, 2min etc) */}
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      {/* Edit Option Button */}
      {/* Only show edit button if the current logged in user is the creator of the post */}
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}

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
        {/* Like button */}
        <Button
          size="small"
          color="primary"
          // this is to disable like button if there is no user(no user logged in)
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>

        {/* Only show Delete button is the current user logged in has created the post */}
        {/* here we're checking if the current user logged in via googleAuth or jwt token is the creator of the post only then show this delete button */}
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
