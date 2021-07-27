import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

// To set up router
const router = express.Router();

// here all users can see the posts
router.get("/", getPosts);

// but here only logged in users can create the post so we pass auth to check
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;

// here's how it works first route will run "/:id" -> auth(middlewear) if authorised then -> updatePost/deletePost...
