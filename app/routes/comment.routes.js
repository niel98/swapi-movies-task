const express = require("express");
const router = express.Router();
const {
  createComment,
  getComments,
} = require("../controllers/comment.controller");

router
.post("/create/:movie_id", createComment)
.get("/movie/:id", getComments)

module.exports = router;
