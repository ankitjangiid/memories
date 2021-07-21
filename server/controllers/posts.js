import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

// to extrect posts
export const getPosts = async (req, res) => {
  try {
    //   we use await here because finding all posts from DB takes time and that makes it async, so to fix that we use await
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

  const newPost = new PostMessage(post);

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

  // to check if the id is really mongoose id or not
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  // here post is initial like count
  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
};
