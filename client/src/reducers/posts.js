import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

// in reducers the state always needs to be equal to something
// we write 'state=[]' because our posts are gonna be an array
// then we change the name of state to posts to make it more easy
export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case FETCH_ALL:
      // here action.payload is from action/posts file where payload is just the data
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case FETCH_POST:
      return { ...state, post: action.payload.post };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };
    case CREATE:
      // we return array because we have array of posts
      // here this line means that first get all posts(previous posts) and then add a new one with them which is action.payload
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      // map return an updated post array
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };
    case DELETE:
      // here we are filtering through the posts and finding the post where post._id != action.payload (which we want to delete)
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};

// this file is what useSelector returns
// here we return isLoading, post, posts
