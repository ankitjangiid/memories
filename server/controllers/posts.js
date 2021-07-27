import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

// to extrect posts
export const getPosts = async (req, res) => {
  try {
    //  we use await here because finding all posts from DB takes time and that makes it async, so to fix that we use await
    const postMessages = await PostMessage.find();

    //  to set status to 200(which is successful) and to return a json of all messages we've
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// to create posts
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    // 201 means successful creation
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//  to update post
export const updatePost = async (req, res) => {
  // here id is the url id that we set in routes/posts "/:id"
  const { id: _id } = req.params;
  const post = req.body;

  // to check if the id is really mongoose id or not
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  // PostMessage is mongoose model
  // 'new: true' so that we can actually receive that updated post
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

// to delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  // to check if the id is really mongoose id or not
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

// to like a post
export const likePost = async (req, res) => {
  const { id } = req.params;

  // here 'userId' is declared in middleware/auth file
  // if req.userid is not defined it means user if not authenticated
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  // to check if the id is really mongoose id or not/ if post exists with that id or not
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  // here post is initial like count
  const post = await PostMessage.findById(id);

  // to check if the post is already liked or not
  // we're comparing the id's of user who is liking the post and user's who already likes the post
  // we find this id(every liked users id) and if id exist then check is its equal to req.userId(who is liking the post)
  const index = post.likes.findIndex((id) => id === String(req.userId));
  // it means that in above findIndex it returned false it means this user doesn't like the post yet
  if (index === -1) {
    //  to like the post
    post.likes.push(req.userId);
  } else {
    // to dislike the post

    // this filter will gonna return all and array of all the likes besides the person's like(who is currently userId)
    // basically its the number of likes - 1 because current user is disliking
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  // here we already updated the likeCount so we simply update the whole post
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
