import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
  name: String,
});

export default mongoose.model("Role", roleSchema);
