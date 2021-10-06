import mongoose from "mongoose";
import Role from "./role.js";
import User from "./user.js";
import Comic from "./comic.js";
import Chapter from "./chapter.js";
import Author from "./author.js";

mongoose.Promise = global.Promise;

const db = {};

db.User = User;
db.Role = Role;
db.ROLES = ["user", "admin", "moderator"];

db.Comic = Comic;
db.Chapter = Chapter;
db.Author = Author;

export default db;
