import mongoose from "mongoose";
import Course from "../models/course.js";

// create new cause
export function createCourse(req, res) {
  const course = new Course({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
  });

  return course
    .save()
    .then((newCourse) => {
      return res.status(201).json({
        success: true,
        message: "New cause created successfully",
        Course: newCourse,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
        courses: course,
      });
    });
}

// Get all course
export function getAllCourse(req, res) {
  let paginate = false;
  // const page = req.body.params?._page;
  // const limit = req.body.params?._limit;

  let page = req.query?._page;
  let limit = req.query?._limit;

  if (typeof page == "string" && typeof limit == "string") {
    page = Number.parseInt(page);
    limit = Number.parseInt(limit);
  }

  if (
    typeof page == "number" &&
    typeof limit == "number" &&
    page >= 0 &&
    limit >= 1
  ) {
    paginate = true;
  }

  Course.find()
    .select("_id title description")
    .then((allCourse) => {
      if (paginate && (page - 1) * limit < allCourse.length) {
        const items = allCourse.filter((course, index, arr) => {
          if (index >= (page - 1) * limit && index < page * limit) return true;
          return false;
        });
        return res.status(200).json({
          success: true,
          message: "A list of course",
          _page: page,
          _limit: limit,
          Course: items,
        });
      } else if (paginate) {
        return res.status(200).json({
          success: false,
          message: "out of range",
          page: page,
          limit: limit,
          Course: null,
        });
      }
      return res.status(200).json({
        success: true,
        message: "A list of all course",
        Course: allCourse,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

// get single course
export function getSingleCourse(req, res) {
  const id = req.params.courseId;
  Course.findById(id)
    .then((singleCourse) => {
      res.status(200).json({
        success: true,
        message: `More on ${singleCourse.title}`,
        Course: singleCourse,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This course does not exist",
        error: err.message,
      });
    });
}

// update course
export function updateCourse(req, res) {
  const id = req.params.courseId;
  const updateObject = req.body;
  Course.updateOne({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Course is updated",
        updateCourse: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
}

// delete a course
export function deleteCourse(req, res) {
  const id = req.params.courseId;
  Course.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
}
