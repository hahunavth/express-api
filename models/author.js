import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
  name: String,
  // comic: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Commic",
  //   },
  // ],
});

authorSchema.virtual("comics", {
  ref: "Author",
  localField: "authorId",
  foreignField: "_id",
  justOne: true,
});

export default mongoose.model("Author", authorSchema);
