const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");
const asyncHandler = require("./async.js");
const ErrorResponse = require("../utils/errorResponse.js");
const db = require("../models/index.js");

const verifyToken = asyncHandler(async (req, res, next) => {
  //Get token from headers
  let token = req.headers["x-access-token"];

  if (!token) {
    return next(new ErrorResponse("Unauthorized access", 403));
  }
  //verify and decode token
  jwt.verify(
    token,
    config.secret,
    asyncHandler(async (err, decoded) => {
      console.log(
        "🚀 ~ file: authJwt.js ~ line 19 ~ asyncHandler ~ decoded",
        decoded
      );
      console.log("here");
      if (err || !decoded.user) {
        return next(new ErrorResponse("Unauthorized access", 401));
      }
      //store decoded token in request
      let user = null;
      if (decoded.user.role == "dispatch" || decoded.user.role == "rider") {
        user = await db.DispatchUser.findOne({
          where: { id: decoded.user.id },
        });
      } else {
        user = await db.User.findOne({ where: { id: decoded.user.id } });
      }
      req.user = user;
      next();
    })
  );
});

const authorize = (...roles) => {
  return (req, res, next) => {
    //console.log(req.user)
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `Your current role is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

const authJwt = {
  verifyToken,
  authorize,
};
module.exports = authJwt;
