import express from "express";

import {
  getPosts,
  getPostsBySearch,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/posts.js";

// To set up router
const router = express.Router();
import auth from "../middleware/auth.js";

// search
router.get("/search", getPostsBySearch);
// here all users can see the posts
router.get("/", getPosts);
// for a single post
router.get("/:id", getPost);

// but here only logged in users can create the post so we pass auth to check
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;

// here's how it works first route will run "/:id" -> auth(middlewear) if authorised then -> updatePost/deletePost...
