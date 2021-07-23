import { v2 as cloudinary } from "cloudinary";
// const cloudinary = require("cloudinary").v2;
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "hahunavth",
  api_key: "514845255119335",
  api_secret: "MyPGoUqErttVnmB_qw5LrHePBFA",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// cloudinary.api.delete_resources("zpr2bs8uj73pbdcclyxa");

// console.log(cloudinary);
const uploadCloud = multer({ storage });

export const cloudinaryApi = cloudinary.api;
export default uploadCloud;
