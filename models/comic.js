import mongoose from "mongoose";

const comicSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    anotherName: String,
    comicImg: String,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    status: String,
    genres: [String],
    views: Number,
    rate: Number,
    subcribe: Number,
    description: String,
    // chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comic", comicSchema);
