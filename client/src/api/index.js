import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

// this is a funtion which will happen on each of our request
// this will send token to our middlewear which is in our backend to verify
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    // Bearer is just an prefix to put in front of token
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// const url = "https://memories-projectbackend.herokuapp.com/posts";

// this is same as previous just now we dont have to specify the starting point of the url

// export const fetchPosts = () => axios.get(url);
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

// this is the file which is talking to our backend server

/* 
Let's understand how delete is working: 
  1. Firts user press the button Delete in post.js file(inside posts file)
  2. Then there we specify an dispatch which will triger the deletePost function which is in file 'Actions'
  3. Then we go to file posts in actions where there is a function which do two things:
    a. First it creates an api request an called api.deletePost which is in this Api/index file
    b. It creates an action of Type DELETE and provide an id
  -> First an api call will happen so,
  4. We come to Api/index file where we have an function called deletePost which is talking to server file so to sends an .delete request with the url of post to server/routes/posts
  5. now in routes/posts we have a router.delete function which we call in api file "axios.delete" and there we are taking a url and again a funtion deletePost will be called which is in Controller/posts
  6. now in controller/posts we have funtion deletPost, there we extract the id and check if id is valid or not then we use PostMessage model and call findByIdAndRemove to remove that post with that id and send a successfull message.
  -> Now post is deleted but that is another thing to do and that is to update the dispath
  7. Now we come to '3.b' currently we're in actions/posts file where we create an action with type 'DELETE' and payload which is id then we dispatch that id and now we go to file reducers/posts where reducer is declared
  8. In reducers/posts we have a switch case on action type here we're deleting so action is DELETE where it is returing all the posts except that post which need to be deleted and now we go to File reducers/index
  9. in reducers/index we call posts file and export by calling combineReducers({ posts }) which is redux function to update the global variale, since we removed the deleted post by filtering we can now update the global varaible with all left posts
  => Now process is completed 
*/
