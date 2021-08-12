import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";
// here '*' means we import everything from api as 'api'
import * as api from "../api/index.js";

// Action Creators
// action creators are the fuction that returns action
// action is just an object that has type and a payload

// here we're using 'redux-thunk' because fetching data is a async process and using thunk we sync that
// here we put another call-back function inside one which is thunk
export const getPosts = (page) => async (dispatch) => {
  try {
    // to start loading before extracting data
    dispatch({ type: START_LOADING });
    // fetching all the data(posts) from api
    // here data is all the posts
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page);

    // payload is the data where we store our all posts
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    // this dispatch will be used in App.js
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

// to get details of a single post
export const getPost = (id) => async (dispatch) => {
  try {
    // to start loading before extracting data
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

// To get post by search
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    // here we destructure data 2 times, first time because we're making an axios request and secound time because we put it in new object where it has data property (in server/controller/posts res.json({ data: posts}))
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

// this dispatch comes from redux thunk
export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });

    // this dispatch will be used in components/Form
    history.push(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

// this is for updating
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
  // from here we go to reducers/posts
};

// this is to like post
export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// this is for deleting
export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

// From this file we send data to reducer
