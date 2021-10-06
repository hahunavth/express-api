import express from "express";

import { validPaginate } from "../middlewares/paginate.js";
import {
  getAllComic,
  createComic,
  deleteComic,
  updateComic,
  getOneComic,
  searchComic,
} from "../controllers/comic.controller.js";

const comicRouter = express.Router();

comicRouter.get("/", [validPaginate], getAllComic);

comicRouter.post("/", createComic);

comicRouter.post("/:id", updateComic);

comicRouter.delete("/:id", deleteComic);

comicRouter.get("/search", searchComic);

comicRouter.get("/:id", [validPaginate], getOneComic);

export default comicRouter;
