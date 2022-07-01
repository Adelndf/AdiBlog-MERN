const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
const User = require("../models/User");

const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500);
    throw new Error("Can't get all the posts");
  }
});

const createPost = asyncHandler(async (req, res) => {
  const { description, userID } = req.body;
  console.log(req.file);
  try {
    const newPost = await Post.create({
      description,
      userID,
      postImage: req.file.path,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500);
    throw new Error("error => Did't create post!!");
  }
});

const getSinglePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(400);
      throw new Error("Can't find the post!!");
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400);
    throw new Error("Can't find the post!!");
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const { description } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (post.userID === req.body.userID) {
      await post.updateOne({ description });
      res.status(200).json({ message: "Updated post seccesfully!" });
    }
  } catch (err) {
    res.status(500);
    throw new Error("Can't do this action");
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.deleteOne();
    res.status(200).json({ message: "Deleted the post seccesfully!" });
  } catch (err) {
    res.status(500);
    throw new Error("Can't do this action");
  }
});

const likePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({ likes: post.likes + 1 });
    res.status(200).json({ message: `post has bees liked` });
  } catch (err) {
    res.status(500);
    throw new Error("Can't do this action 'Likes'");
  }
});

const disLikePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({ likes: post.likes - 1 });
    res.status(200).json({ message: `post has bees liked` });
  } catch (err) {
    res.status(500);
    throw new Error("Can't do this action 'Likes'");
  }
});

module.exports = {
  getPosts,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
  likePost,
  disLikePost,
};
