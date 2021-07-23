import express from "express";

import verifySignUp from "../middlewares/verifySignUp.js";
import { signin, signup } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

authRouter.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  signup
);

authRouter.post("/signin", signin);

export default authRouter;

//NOTE
/*

/signup
  body:
    {
      "username": "hahunavth3",
      "email": "a@b.cde",
      "password": "hahaha",
      "roles": ["admin"]
    }

/signin
  body: 
    {
      "username": "hahunavth3",
      "password": "hahaha"
    }
*/
