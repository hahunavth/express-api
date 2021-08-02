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
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
});

export default mongoose.model("Commic", commicSchema);
