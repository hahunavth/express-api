// import dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import cors from "cors";
// import logger from "morgan";
import router from "./routes/main.js";
import db from "./models/index.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cloudinaryRouter from "./routes/cloudinary.routes.js";
import { docs } from "./docs.js";

// set up dependencies
const app = express();
const port = process.env.PORT || 5000;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

// console.log(process.env.DATABASE_URL);

// set up mongoose
mongoose
  .connect(
    // "mongodb+srv://hahunavth:a19042001442@cluster0.auw0z.mongodb.net/student?retryWrites=true&w=majority",
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
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

app.get("/", (req, res) => {
  res.status(200).json(docs);
});

app.use("/api/v1", router);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/test", userRouter);
app.use("/api/v1/cloudinary", cloudinaryRouter);

const Role = db.Role;
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
