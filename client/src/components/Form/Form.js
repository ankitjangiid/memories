import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
// to use the dispatch
import { useDispatch, useSelector } from "react-redux";
// to convert image into text
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: "", message: "", tags: [], selectedFile: "" });
  // all the posts(update post) fetched by redux
  // here we specify that we only want the data of the post which has to be updated
  // we check if we have currentId(which means we want to update) then find post with that id
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  // to get the user from localstorage
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
  };

  // to populate the fields with update post
  // here [] means when it should run/ on what change it should run
  // and here we put 'post' that we get from redux above
  // it means that in begining post will be empty because we don't want to update but
  // when we click button to update 'post' will get populated and will "change" which will triger this useEffect
  useEffect(() => {
    // here we write if post exist then change the post data
    if (!post?.title) clear();
    if (post) setPostData(post);

    // below commen to just to hide warning
    // eslint-disable-next-line
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logic that if we have currentId which means we want to update
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
      // from here we go to reducers/posts
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  // to check if there is no loggedin user then we can not create post
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your post and like others.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post?.title}"` : "Create a Memory"}
        </Typography>

        {/* In new version we dont need it because creator will be equal to the username that is logged in */}
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          // if we write onChange like this to change creator only,
          // the problem is that we're overwriting the whole postData state so now there will be only one object called creator and we can't use another one
          // onChange={(e) => setPostData({ creator: e.target.value })}

          // so to fix that we first have to get the previous data also by spreading the data
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        /> */}

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          className={classes.textField}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={5}
          value={postData.message}
          className={classes.textField}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />

        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            className={classes.textField}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>

        <Button
          className={classes.submitButton}
          variant="contained"
          size="large"
          type="submit"
          fullWidth
          style={{ margin: "10px 0" }}
        >
          Submit
        </Button>
        <Button
          className={classes.clearButton}
          variant="contained"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
