const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/gif" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Only less than 5 MB
  fileFilter: fileFilter,
});

const {
  getPosts,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
  likePost,
  disLikePost,
} = require("../controllers/post");

// Get all posts
// Create post
router.route("/").get(getPosts).post(upload.single("postImage"), createPost);

// Get single post
// Upadte post
// Delete post
router.route("/:id").get(getSinglePost).put(updatePost).delete(deletePost);

// Likeing the post +
router.route("/:id/like").put(likePost);
// Dislikeing the post -
router.route("/:id/dislike").put(disLikePost);

module.exports = router;
