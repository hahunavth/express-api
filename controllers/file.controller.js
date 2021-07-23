import mongoose from "mongoose";
import File from "../models/file.js";
import { cloudinaryApi } from "../config/cloudinary.config.js";

export function createFile(req, res) {
  const file = new File({
    _id: mongoose.Types.ObjectId(),
    originalname: req.file.originalname,
    filename: req.file.filename,
    path: req.file.path,
    encoding: req.file.encoding,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });

  return file.save().then((newFile) => {
    return res.status(201).json({
      success: true,
      message: "New file upload successfully",
      secure_url: req.file.path,
    });
  });
}

export function getAllFile(req, res) {
  File.find()
    .select("_id filename originalname path")
    .then((allFile) => {
      return res.status(200).json({
        success: true,
        file: allFile,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    });
}

export function getSingleFile(req, res) {
  const id = req.params.fileId;
  File.findOne({ filename: id })
    .then((file) => {
      res.status(200).json({
        success: true,
        file: file,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        file: null,
      });
    });
}

export function deleteFile(req, res) {
  const id = req.params.fileId;
  File.findOneAndRemove({ filename: id }, {}, (err) => {
    if (err) res.status(500).send("a");
    cloudinaryApi
      .delete_resources(id)

      .then(() => {
        res.status(200).json({
          success: true,
        });
      });
  }).exec();
  // .exec()
  // .then(() => {
  //   // return cloudinaryApi.delete_resources(id).then(
  //   //   () => {
  //   return res.status(204).json({
  //     success: true,
  //   });
  //   // },
  //   // () => {
  //   //   return res.status(204).json({
  //   //     success: false,
  //   //   });
  //   //   }
  //   // );
  // })
  // // .then(() =>
  // //   res.status(204).json({
  // //     success: true,
  // //   })
  // // )
  // .catch((err) =>
  //   res.status(500).json({
  //     success: false,
  //   })
  // );
}
