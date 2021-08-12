import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
// initialising dispatch to delete a post
import { useDispatch } from "react-redux";
// moment is just to display the time when post was created
import moment from "moment";
import { useHistory } from "react-router-dom";
import background from "../../../images/background.jpg";

import { likePost, deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  // Like logic
  const Likes = () => {
    // if there is some like(more than 0) then run this
    if (post?.likes?.length > 0) {
      // here first we're finding the user in likes, if users id was found in it that means he already liked it
      // so then we check if there is more like than 2 that means user and 2 others liked it, in that case we print You and 2 others
      // if there is less than equal to 2 it means only user liked it or user and someone else
      // then, if user didn't liked it yet then aaccording to that we print something else
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <FavoriteIcon style={{ color: "#28B5B5" }} />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FavoriteBorderOutlinedIcon style={{ color: "#28B5B5" }} />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <FavoriteBorderOutlinedIcon style={{ color: "#28B5B5" }} />
        &nbsp;Like
      </>
    );
  };

  // To Open a post
  // here we're puching to a post with the post._id which is currently selected
  const openPost = (e) => {
    history.push(`/posts/${post._id}`);
  };

  const [hover, setHover] = useState(false);
  return (
    <Card
      className={classes.card}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      raised
      elevation={hover ? 8 : 3}
    >
      <ButtonBase component="span" name="test" className={classes.cardAction} onClick={openPost}>
        {/* Image Background */}
        <CardMedia
          className={classes.media}
          image={post.selectedFile || background}
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
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: "white" }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}

        {/* Tags */}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>

        {/* Title */}
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>

        {/* Message */}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>

      {/* Buttons */}
      <CardActions className={classes.cardActions}>
        {/* Like button */}
        <Button
          size="small"
          style={{ color: "#4F5D5A" }}
          // this is to disable like button if there is no user(no user logged in)
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>

        {/* Only show Delete button is the current user logged in has created the post */}
        {/* here we're checking if the current user logged in via googleAuth or jwt token is the creator of the post only then show this delete button */}
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button
            size="small"
            style={{ color: "#FF7F7F" }}
            onClick={() => {
              dispatch(deletePost(post._id));
              // to refresh page after deleting a post
              window.location.reload(false);
            }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
