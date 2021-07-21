import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

// to convert image into text
import FileBase from "react-file-base64";

// to use the dispatch
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

// // to fetch data from redux
// import { useSelector } from "react-redux";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // all the posts(update post) fetched by redux
  // here we specify that we only want the data of the post which has to be updated
  // we check if we have currentId(which means we want to update) then find post with that id
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  // to populate the fields with update post
  // here [] means when it should run/ on what change it should run
  // and here we put 'post' that we get from redux above
  // it means that in begining post will be empty because we don't want to update but
  // when we click button to update 'post' will get populated and will "change" which will triger this useEffect
  useEffect(() => {
    // here we write if post exist then change the post data
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Logic that if we have currentId which means we want to update
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
      // from here we go to reducers/posts
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root}  ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
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
        />

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          tags
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        {/* here split is use to convert an string with words into an array of words with "," between them */}
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
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
