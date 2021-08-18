import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";
import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const [comments, setComments] = useState(post?.comments);
  const [comment, SetComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    SetComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h5">
            Comments
          </Typography>
          {comments.map((comment, index) => (
            <Typography
              key={index}
              gutterBottom
              variant="subtitle1"
              style={{ wordBreak: "break-word" }}
            >
              <strong>{comment.split(": ")[0]}:</strong>
              {comment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>

        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>

            <TextField
              fullWidth
              rows={4}
              InputLabelProps={{ className: classes.textFieldLabel }}
              className={classes.textField}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => SetComment(e.target.value)}
            />

            <Button
              className={classes.commentButton}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
