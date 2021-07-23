import express from "express";
import {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.js";

import {
  createCommic,
  getAllCommic,
  getChapter,
  getCommic,
  searchCommic,
} from "../controllers/commic.js";

const router = express.Router();
router.post("/courses", createCourse);
router.get("/courses", getAllCourse);
router.get("/courses/:courseId", getSingleCourse);
router.patch("/courses/:courseId", updateCourse);
router.delete("/courses/:courseId", deleteCourse);

router.post("/commics", createCommic);
router.get("/commics", getAllCommic);
router.get("/commics/:id/chapter/:chapter_number", getChapter);
router.get("/commics/:id", getCommic);
router.get("/commics_search/", searchCommic);

export default router;

// ANCHOR
/*
post("/courses");
get("/courses");
get("/courses/:courseId");
patch("/courses/:courseId");
delete("/courses/:courseId");

post("/commics");
  body: 
    {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        another_name: req.body.another_name,
        status: req.body.status,
        genres: req.body.genres,
        views: req.body.views,
        rate: req.body.rate,
        subcribe: req.body.subcribe,
        description: req.body.description,
        created_at: req.body.created_at,
        chapters: req.body.chapters,
    } 
get("/commics");

get("/commic/:id/chapter/:chapter_number");

get("/commic/:id");

 */
