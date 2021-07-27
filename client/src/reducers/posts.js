import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";
// in reducers the state always needs to be equal to something
// we write 'state=[]' because our posts are gonna be an array
// then we change the name of state to posts to make it more easy
const reducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      // here action.payload is from action/posts file where payload is just the data
      return action.payload;

    case CREATE:
      // we return array because we have array of posts
      // here this line means that first get all posts(previous posts) and then add a new one with them which is action.payload
      return [...posts, action.payload];

    case UPDATE:
      // map return an updated post array
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case DELETE:
      // here we are filtering through the posts and finding the post where post._id != action.payload (which we want to delete)
      return posts.filter((post) => post._id !== action.payload);

    default:
      return posts;
  }
};

export default reducer;
