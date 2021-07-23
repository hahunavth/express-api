import mongoose from "mongoose";
import Role from "./role.js";
import User from "./user.js";

mongoose.Promise = global.Promise;

const db = {};

db.User = User;
db.Role = Role;
db.ROLES = ["user", "admin", "moderator"];

export default db;
