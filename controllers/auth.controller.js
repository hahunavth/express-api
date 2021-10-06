import config from "../config/auth.config.js";
import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.User;
const Role = db.Role;

export function signup(req, res) {
  // new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  // save user
  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
    }
    // if user has roles
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          // find roles error
          if (err) {
            res.status(500).send({
              success: false,
              message: err,
            });
          }
          // find success
          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({
                success: false,
                message: err,
              });
              return;
            }
            res.send({
              success: true,
              message: "User was registered successfully!",
            });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({
            success: false,
            message: err,
          });
          return;
        }
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({
              success: false,
              message: err,
            });
            return;
          }
          res.send({
            success: true,
            message: "User was registered successfully!",
          });
        });
      });
    }
  });
}

export const signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({
          success: false,
          accessToken: null,
          message: "User Not found.",
        });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          success: false,
          message: "Invalid Password!",
          data: {
            id: null,
            username: user.username,
            email: user.email,
            roles: null,
            accessToken: null,
          },
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        success: true,
        message: "Login Successfully",
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        },
      });
    });
};

export const changePassword = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newPassword = req.body.newPassword;

  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({
          success: false,
          accessToken: null,
          message: "User Not found.",
        });
      }
      var passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          success: false,
          message: "Invalid Password!",
          data: {
            id: null,
            username: user.username,
            email: user.email,
            roles: null,
            accessToken: null,
          },
        });
      } else {
        User.updateOne(
          { username: username },
          { password: bcrypt.hashSync(newPassword, 8) },
          (err, doc) => {
            if (doc) {
              res.status(200).send({
                success: true,
                message: "Change password successfully!",
              });
            }
          }
        );
      }
    });
};
// export const signout()
