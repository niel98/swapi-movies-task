const db = require("../models");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const createComment = asyncHandler(async (req, res, next) => {
  const { comment } = req.body;
  const { movie_id } = req.params;

  if (!comment) {
    return next(new ErrorResponse("comment cannot be empty", 400));
  }
  if (comment.length > 500) {
    return next(new ErrorResponse("Comment cannot be more than 500", 400));
  }
  const reg = /^\d+$/;
  if (!reg.test(movie_id)) {
    return next(new ErrorResponse("Movie Id can only be a numeric value"));
  }

  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const newComment = await db.Comment.create({
    comment,
    movie_id,
    ip: clientIp,
  });

  //   console.log(req.headers["x-forwarded-for"] || req.socket.remoteAddress);
  res.status(200).send({
    ip: clientIp,
    comment: newComment,
  });
});

const getComments = asyncHandler(async (req, res, next) => {
  const comments = await db.Comment.findAll({
    where: { movie_id: req.params.id },
    orderBy: [['id', 'DESC']]
  });
  if (!comments) {
    return next(new ErrorResponse("no comments found", 404));
  }

  return res.status(200).send({
    message: "comments found",
    data: comments,
  });
});

module.exports = {
  createComment,
  getComments
};
