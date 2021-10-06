import db from "../models/index.js";

const ROLES = db.ROLES;
const User = db.User;

const checkValidateInfo = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.toLowerCase())) {
    res.status(500).send({
      success: false,
      message: "Email is not valid",
    });
    return;
  }
  next();
};

const checkDuplicateUsername = (req, res, next) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    }
    if (user) {
      res.status(400).send({
        success: false,
        message: "Failed! Username is already in use!",
      });
      return;
    }
    next();
  });
};

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    }
    if (user) {
      res.status(400).send({
        success: false,
        message: "Failed! Email is already in use!",
      });
      return;
    }
    next();
  });
};

// const checkDuplicateUsernameOrEmail = (req, res, next) => {

// };

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkValidateInfo,
  checkDuplicateUsername,
  checkDuplicateEmail,
  checkRolesExisted,
};

export default verifySignUp;
