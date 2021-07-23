import express, { request } from "express";
import uploadCloud from "../config/cloudinary.config.js";
import {
  createFile,
  getAllFile,
  getSingleFile,
  deleteFile,
} from "../controllers/file.controller.js";

const cloudinaryRouter = express.Router();

cloudinaryRouter.post(
  "/upload",
  uploadCloud.single("file"),
  (req, res, next) => {
    if (!req.file) {
      res.status(400).send("no upload file");
      return;
    }
    console.log(req.file);

    // res.status(200).json({ secure_url: req.file.path });
    next();
  },
  createFile
);

cloudinaryRouter.get("/", getAllFile);
cloudinaryRouter.get("/:fileId", getSingleFile);
cloudinaryRouter.delete("/:fileId", deleteFile);

export default cloudinaryRouter;
