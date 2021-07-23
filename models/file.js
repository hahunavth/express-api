import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    originalname: String,
    filename: String,
    path: String,
    encoding: String,
    mimetype: String,
    size: Number,
  },
  {
    timestamps: true,
  }
);

// export default
export default mongoose.model("File", fileSchema);
