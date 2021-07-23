import mongoose from "mongoose";

// mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

export default mongoose.model("User", userSchema);
