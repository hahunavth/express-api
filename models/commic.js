import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const commicSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  another_name: String,
  commic_img: String,
  author: String,
  status: String,
  genres: [String],
  views: Number,
  rate: Number,
  subcribe: Number,
  description: String,
  created_at: Date,
  chapters: {
    type: [
      {
        chapter_number: {
          type: Number,
          required: true,
        },
        chapter_name: String,
        chapter_imgs: [String],
        views: Number,
        created_at: Date,
      },
    ],
    required: true,
  },
});

export default mongoose.model("Commic", commicSchema);
