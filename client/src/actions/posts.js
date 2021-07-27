import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";
// here '*' means we import everything from api as 'api'
import * as api from "../api/index";

// Action Creators
// action creators are the fuction that returns action
// action is just an object that has type and a payload

// here we're using 'redux-thunk' because fetching data is a async process and using thunk we sync that
// here we put another call-back function inside one which is thunk
export const getPosts = () => async (dispatch) => {
  try {
    // fetching all the data(posts) from api
    // here data is all the posts
    const { data } = await api.fetchPosts();

    // payload is the data where we store our all posts
    const action = { type: FETCH_ALL, payload: data };

    dispatch(action);
    // this dispatch will be used in App.js
  } catch (error) {
    console.log(error);
  }
};

// this dispatch comes from redux thunk
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    const action = { type: CREATE, payload: data };

    dispatch(action);
    // this dispatch will be used in components/Form
  } catch (error) {
    console.log(error);
  }
};

// this is for updating

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    const action = { type: UPDATE, payload: data };

    dispatch(action);
  } catch (error) {
    console.log(error);
  }

  // from here we go to reducers/posts
};

// this is for deleting
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    const action = { type: DELETE, payload: id };

    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

// this is to like post
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    const action = { type: LIKE, payload: data };

    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
