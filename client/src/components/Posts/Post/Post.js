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
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { useDispatch } from "react-redux";
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
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLikeClick = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const isUsersPost =
    user?.result?.googleId === post?.creator || user?.result?._id === post?.creator;

  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <FavoriteIcon style={{ color: "#28B5B5" }} />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FavoriteBorderOutlinedIcon
            style={userId ? { color: "#7ED2D2" } : { color: "#DCDCDC" }}
          />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <FavoriteBorderOutlinedIcon style={userId ? { color: "#7ED2D2" } : { color: "#DCDCDC" }} />
        &nbsp;Like
      </>
    );
  };

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
        <CardMedia
          className={classes.media}
          image={post.selectedFile || background}
          title={post.title}
        />

        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>

        {isUsersPost && (
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

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>

        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          style={userId ? { color: "#4F5D5A" } : { color: "#A0A0A0" }}
          disabled={!user?.result}
          onClick={handleLikeClick}
        >
          <Likes />
        </Button>

        {isUsersPost && (
          <Button
            size="small"
            style={{ color: "#FF7F7F" }}
            onClick={() => {
              dispatch(deletePost(post._id));
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
