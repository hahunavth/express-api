import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { writeFile } from "fs";

cloudinary.config({
  cloud_name: "hahunavth",
  api_key: "514845255119335",
  api_secret: "MyPGoUqErttVnmB_qw5LrHePBFA",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "png"],
  // ???
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname);
  // },
  params: {
    folder: (req, file) => {
      console.log(req.query);
      // console.log(file);
      // writeFile("./res.txt", req);
      return req.query.folder ? "/express" + req.query.folder : "/express";
    },
  },
});

const uploadCloud = multer({ storage });

export const cloudinaryApi = cloudinary.api;
export default uploadCloud;
