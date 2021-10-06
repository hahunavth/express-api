import express from "express";

import verifySignUp from "../middlewares/verifySignup.js";
import authJwt from "../middlewares/authJwt.js";
import {
  signin,
  signup,
  changePassword,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

/*=============== MIDDLEWARE ===============*/
authRouter.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

/*=============== ROUTES ===============*/
/*
  POST  /signup
  POST  /signin
  POST  /reset_password
*/

authRouter.post(
  "/signup",
  [
    verifySignUp.checkValidateInfo,
    verifySignUp.checkDuplicateUsername,
    verifySignUp.checkDuplicateEmail,
    verifySignUp.checkRolesExisted,
  ],
  signup
);

authRouter.post("/signin", signin);

authRouter.post(
  "/reset_password",
  // [authJwt.verifyToken],
  changePassword
);

export default authRouter;
