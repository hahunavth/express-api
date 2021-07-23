import mongoose from "mongoose";

// mongoose.Promise = global.Promise;

const roleSchema = mongoose.Schema({
  name: String,
});

export default mongoose.model("Role", roleSchema);
