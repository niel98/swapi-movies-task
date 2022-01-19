const CommentRoutes = require("./comment.routes");
const movieRoutes = require('./movies.routes')
const characterRoutes = require('./character.routes')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use("/api/v1/comment", CommentRoutes);
  app.use("/api/v1/movies", movieRoutes)
  app.use("/api/v1/characters", characterRoutes)
};
