import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    comicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comic",
    },
    chapterNumber: {
      type: Number,
      required: true,
    },
    chapterName: {
      trim: true,
      type: String,
    },
    chapterImgs: [String],
    views: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chapter", chapterSchema);
