import express from "express";

import {
  getChapterbyId,
  countChapter,
  createChapter,
  deleteChapter,
  updateChapter,
} from "../controllers/chapter.controller.js";

const chapterRouter = express.Router();

chapterRouter.get("/", countChapter);
chapterRouter.post("/:id", createChapter);
chapterRouter.get("/:id", getChapterbyId);
chapterRouter.put("/:id", updateChapter);
chapterRouter.delete("/:id", deleteChapter);
chapterRouter.post("/:id", createChapter);

export default chapterRouter;
