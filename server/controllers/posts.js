import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

const router = express.Router();

// to extrect posts
export const getPosts = async (req, res) => {
  // this is the current page we're on
  const { page } = req.query;

  try {
    // Limit of posts per page
    const LIMIT = 6;
    // the index of first post on that page
    // eg: on 3rd page first post index will be 12 (0,6,12)
    //  Here we convert the page into number because when we pass that page(which was number in frontend side) through query it became string
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    // total number of posts
    const total = await PostMessage.countDocuments({});

    //  we use await here because finding all posts from DB takes time and that makes it async, so to fix that we use await
    // here we sort posts by time
    // here _id: -1 will give us the newest post first
    // .limit will give us only specify posts
    // .skip is to skip all previous posts, like you're on 3rd page then it will skip all posts from page 1 and 2 till startIndex
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    //  to set status to 200(which is successful) and to return a json of all messages we've
    res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// to search a post
export const getPostsBySearch = async (req, res) => {
  /* 
  here lets discuss difference between Query and Params
  Query: /posts?page=1 -> page-1  (page variable is equal to 1)
  Params:  /posts/:id (/posts/123) -> id = 123   
*/
  const { searchQuery, tags } = req.query;

  try {
    // here 'i' stands for ignore case which means test, TEST, Test -> test
    // RegExp = regularExpression
    const title = new RegExp(searchQuery, "i");
    /*
  here $or means either find title or tags which means we want to find a post which match either title or tags
  here $in means is there a specific tag inside the array of tags
  then we're splitting them with "," because earlier we join them to send through url
    lets see step by step:
    -> $or: [1, 2]  => either find me 1 or 2 (return either 1 or 2 which ever is true)
        so we write $or: [{title}, {tags}] either find me data which match title or tags
    
    -> tags: {$in: tagsArray} => is there a tag which is equal to tags in tagsArray
    -> tags.split(",") => we make them again in array that we converted in string to send via url
*/

    const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// to get a post
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// to create posts
export const createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    // 201 means successful creation
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//  to update post
export const updatePost = async (req, res) => {
  // here id is the url id that we set in routes/posts "/:id"
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  // to check if the id is really mongoose id or not
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  // PostMessage is mongoose model
  // 'new: true' so that we can actually receive that updated post
  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

// to delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  // to check if the id is really mongoose id or not
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

// to like a post
export const likePost = async (req, res) => {
  const { id } = req.params;

  // here 'userId' is declared in middleware/auth file
  // if req.userid is not defined it means user if not authenticated
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  // to check if the id is really mongoose id or not/ if post exists with that id or not
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

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
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  res.status(200).json(updatedPost);
};

export default router;
