import express from "express";
import {
  adminBoard,
  allAccess,
  moderatorBoard,
  userBoard,
} from "../controllers/user.controller.js";
import authJwt from "../middlewares/authJwt.js";

const userRouter = express.Router();

userRouter.get(
  "/data/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  adminBoard
);
userRouter.get("/data/access", allAccess);
userRouter.get(
  "/data/moderator",
  [authJwt.verifyToken, authJwt.isModerator],
  moderatorBoard
);
userRouter.get("/data/user", userBoard);

export default userRouter;

//NOTE
/*

    /data/admin
        header: x-access-token

*/
