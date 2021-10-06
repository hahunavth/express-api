import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import db from "./models/index.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import comicRouter from "./routes/comic.route.js";
import chapterRouter from "./routes/chapter.route.js";

/*=============== INIT ===============*/
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(logger("dev"));
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.auw0z.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    // "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Our server is running on port ${port}`);
      // initial();
    });
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

const Role = db.Role;

initial();

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

/*=============== ROUTES ===============*/
app.get("/", (req, res) => {
  res.status(200).json({});
});

app.use("/api/v1/accounts", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/comics", comicRouter);
app.use("/api/v1/chapters/", chapterRouter);
