import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const chapterSchema = new mongoose.Schema(
  {
    chapter_number: {
      type: Number,
      required: true,
    },
    chapter_name: String,
    chapter_imgs: [String],
    views: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chapter", chapterSchema);
