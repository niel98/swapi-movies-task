const db = require("../models");
const asyncHandler = require("./async");
const Login = db.Login;

const checkDuplicateEmail = asyncHandler(async (req, res, next) => {
  // Email
  db.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        status: "fail",
        message: "Email is already in use!",
      });
      return;
    }

    next();
  });
});

const checkDuplicatePhone = asyncHandler(async (req, res, next) => {
  //phonenumber
  if (req.body.phone) {
    const { phone } = req.body;
    const phoneNo = "+234" + phone.slice(1);
    //const table = type.charAt(0).toUpperCase() + type.slice(1);
    db.User.findOne({
      where: {
        phone: phoneNo,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          status: "fail",
          message: "Phone number is already exists!",
        });
        return;
      }
      next();
    });
  }
});

const checkDuplicateUsername = asyncHandler(async (req, res, next) => {
  // Email
  db.User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        status: "fail",
        message: "Username is already in use!",
      });
      return;
    }

    next();
  });
});

// checkRolesExisted = (req, res, next) => {
//   if (req.body.roles) {
//     for (let i = 0; i < req.body.roles.length; i++) {
//       if (!Roles.includes(req.body.roles[i])) {
//         res.status(400).send({
//           message: "Failed! Role does not exist = " + req.body.roles[i]
//         });
//         return;
//       }
//     }
//   }

//   next();
// };

const verify = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkDuplicatePhone: checkDuplicatePhone,
  checkDuplicateUsername: checkDuplicateUsername,
  //   checkRolesExisted: checkRolesExisted
};

module.exports = verify;
